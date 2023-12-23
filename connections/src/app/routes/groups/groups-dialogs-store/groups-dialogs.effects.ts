import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, combineLatest, filter, map, of, retry, switchMap, take, tap, throwError, timer } from 'rxjs'

import { selectGroups } from '../groups-store/groups.selectors'
import { groupsDialogsApiActions } from './actions/groups-dialogs-api.actions'
import { groupsDialogsActions } from './actions/groups-dialogs-page.actions'
import { selectDialogs } from './groups-dialogs.selectors'
import { convertMessageToAuthoredMessage } from './helpers/convert-message-to-authored-message.helper'
import { convertMessagesToDialog } from './helpers/convert-messages-to-dialog.helper'
import type { Dialog } from './models/dialog.model'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import { selectUserNames } from 'src/app/core/store/users-store/users.selectors'
import type { Group } from 'src/app/repositories/groups/models/group.model'
import { GroupsService } from 'src/app/repositories/groups/services/groups.service'
import { selectUid } from 'src/app/routes/auth/auth-store/auth.selectors'

@Injectable()
export class GroupsDialogsEffects {
  private dialogs$ = this.store.select(selectDialogs)
  private groups$ = this.store.select(selectGroups)
  private uid$ = this.store.select(selectUid)
  private userNames$ = this.store.select(selectUserNames)

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private alertService: AlertService,
    private store: Store,
  ) {}

  public getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsDialogsActions.getMessages),
      switchMap(({ groupId }) =>
        this.dialogs$.pipe(
          take(1),
          switchMap(dialogs =>
            dialogs[groupId]
              ? of(groupsDialogsActions.updateMessages({ groupId }))
              : of(groupsDialogsActions.loadMessages({ groupId })),
          ),
        ),
      ),
    ),
  )

  public loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsDialogsActions.loadMessages),
      switchMap(({ groupId }) =>
        combineLatest([this.uid$, this.userNames$, this.groups$]).pipe(
          map(({ 0: uid, 1: userNames, 2: groups }) => ({
            groupId,
            uid,
            userNames,
            groups,
          })),
          filter(
            (value): value is { groupId: string; uid: string; userNames: UserNames; groups: Group[] } =>
              Boolean(value.uid) && Boolean(value.userNames) && Boolean(value.groups),
          ),
          take(1),
          switchMap(({ uid, userNames, groups }) =>
            this.groupsService.getMessages(groupId).pipe(
              map(messages =>
                convertMessagesToDialog(
                  messages,
                  uid,
                  userNames,
                  // eslint-disable-next-line max-nested-callbacks
                  groups.find(group => group.id === groupId),
                ),
              ),
              map(dialog => groupsDialogsApiActions.loadMessagesSuccess({ dialog, groupId })),
              catchError(({ error }: { error: ResponseError }) => {
                this.alertService.showError(error.message, 'Could not load messages')

                return of(groupsDialogsApiActions.loadMessagesFailure({ error }))
              }),
            ),
          ),
        ),
      ),
    ),
  )

  public updateMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsDialogsActions.updateMessages),
      switchMap(({ groupId, updateTimer }) =>
        combineLatest([this.uid$, this.userNames$, this.dialogs$]).pipe(
          map(({ 0: uid, 1: userNames, 2: dialogs }) => ({
            uid,
            userNames,
            dialog: dialogs[groupId],
          })),
          filter(
            (value): value is { uid: string; userNames: UserNames; dialog: Dialog } =>
              Boolean(value?.uid) && Boolean(value?.userNames) && Boolean(value?.dialog),
          ),
          take(1),
          switchMap(({ uid, userNames, dialog }) =>
            this.groupsService.getMessages(groupId, dialog.lastUpdate).pipe(
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
                groupsDialogsApiActions.updateMessagesSuccess({ count, messages, groupId, lastUpdate }),
              ),
              tap(() => {
                updateTimer?.()
              }),
              catchError(({ error }: { error: ResponseError }) => {
                this.alertService.showError(error.message, 'Could not load messages')

                return of(groupsDialogsApiActions.updateMessagesFailure({ error }))
              }),
            ),
          ),
        ),
      ),
    ),
  )

  public sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsDialogsActions.sendMessage),
      switchMap(({ groupId, message }) =>
        this.groupsService.sendMessage(groupId, message).pipe(
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
          switchMap(() => [
            groupsDialogsApiActions.sendMessageSuccess(),
            groupsDialogsActions.updateMessages({ groupId }),
          ]),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Send message failed')

            return of(groupsDialogsApiActions.sendMessageFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
