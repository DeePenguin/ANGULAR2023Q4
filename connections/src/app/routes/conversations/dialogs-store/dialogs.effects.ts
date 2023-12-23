import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, combineLatest, filter, map, of, retry, switchMap, take, tap, throwError, timer } from 'rxjs'

import { selectConversations } from '../conversations-store/conversations.selectors'
import { dialogsApiActions } from './actions/dialogs-api.actions'
import { dialogsActions } from './actions/dialogs-page.actions'
import { selectDialogs } from './dialogs.selectors'
import { convertMessageToAuthoredMessage } from './helpers/convert-message-to-authored-message.helper'
import { convertMessagesToDialog } from './helpers/convert-messages-to-dialog.helper'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'
import type { Dialog } from 'src/app/common/models/dialog.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import { selectUserNames } from 'src/app/core/store/users-store/users.selectors'
import { ConversationsService } from 'src/app/repositories/conversations/services/conversations.service'
import { selectUid } from 'src/app/routes/auth/auth-store/auth.selectors'

@Injectable()
export class GroupsDialogsEffects {
  private dialogs$ = this.store.select(selectDialogs)
  private conversations$ = this.store.select(selectConversations)
  private uid$ = this.store.select(selectUid)
  private userNames$ = this.store.select(selectUserNames)
  private additionalInfo$ = combineLatest([this.uid$, this.userNames$, this.conversations$, this.dialogs$]).pipe(
    map(({ 0: uid, 1: userNames, 2: conversations, 3: dialogs }) => ({
      uid,
      userNames,
      conversations,
      dialogs,
    })),
    filter(
      (
        value,
      ): value is {
        uid: string
        userNames: UserNames
        conversations: Record<string, string>
        dialogs: Record<string, Dialog>
      } => Boolean(value.uid) && Boolean(value.userNames) && Boolean(value.conversations) && Boolean(value.dialogs),
    ),
  )

  constructor(
    private actions$: Actions,
    private conversationsService: ConversationsService,
    private alertService: AlertService,
    private store: Store,
  ) {}

  public getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dialogsActions.getMessages),
      switchMap(({ id }) =>
        this.dialogs$.pipe(
          take(1),
          switchMap(dialogs =>
            dialogs[id] ? of(dialogsActions.updateMessages({ id })) : of(dialogsActions.loadMessages({ id })),
          ),
        ),
      ),
    ),
  )

  public loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dialogsActions.loadMessages),
      switchMap(({ id }) =>
        this.additionalInfo$.pipe(
          take(1),
          switchMap(({ uid, userNames, conversations }) =>
            this.conversationsService.getMessages(id).pipe(
              map(({ count, messages }) =>
                convertMessagesToDialog({ count, messages, uid, userNames, conversations, id }),
              ),
              map(dialog => dialogsApiActions.loadMessagesSuccess({ dialog, id })),
              catchError(({ error }: { error: ResponseError }) => {
                this.alertService.showError(error.message, 'Could not load messages')

                return of(dialogsApiActions.loadMessagesFailure({ error }))
              }),
            ),
          ),
        ),
      ),
    ),
  )

  public updateMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dialogsActions.updateMessages),
      switchMap(({ id, updateTimer }) =>
        this.additionalInfo$.pipe(
          take(1),
          switchMap(({ uid, userNames, dialogs }) =>
            dialogs[id]
              ? this.conversationsService.getMessages(id, dialogs[id].lastUpdate).pipe(
                  map(({ count, messages }) => {
                    const authoredMessages =
                      convertArray(
                        // eslint-disable-next-line max-nested-callbacks
                        messages.map(message => ({ ...message, uid, userNames })),
                        convertMessageToAuthoredMessage,
                      ) || []
                    const lastUpdate = authoredMessages[authoredMessages.length - 1]?.createdAt ?? Date.now().toString()

                    return { count, messages: authoredMessages, lastUpdate }
                  }),
                  map(({ count, messages, lastUpdate }) =>
                    dialogsApiActions.updateMessagesSuccess({ count, messages, id, lastUpdate }),
                  ),
                  tap(() => {
                    updateTimer?.()
                  }),
                  catchError(({ error }: { error: ResponseError }) => {
                    this.alertService.showError(error.message, 'Could not load messages')

                    return of(dialogsApiActions.updateMessagesFailure({ error }))
                  }),
                )
              : of(dialogsActions.loadMessages({ id })),
          ),
        ),
      ),
    ),
  )

  public sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dialogsActions.sendMessage),
      switchMap(({ id, message }) =>
        this.conversationsService.sendMessage(id, message).pipe(
          retry({
            count: 3,
            delay: ({ error }: { error: ResponseError }) => {
              if (error.type === 'InvalidIDException') {
                return throwError(() => ({
                  error,
                }))
              }

              return timer(4500)
            },
          }),
          switchMap(() => [dialogsApiActions.sendMessageSuccess(), dialogsActions.updateMessages({ id })]),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Send message failed')

            return of(dialogsApiActions.sendMessageFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public removeDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dialogsActions.removeDialog),
      switchMap(({ id, successCallback }) =>
        this.conversationsService.removeConversation(id).pipe(
          map(() => dialogsApiActions.removeDialogSuccess({ id })),
          tap(() => {
            this.alertService.showSuccess('Remove dialog successful')
            successCallback?.()
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Remove dialog failed')

            return of(dialogsApiActions.removeDialogFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
