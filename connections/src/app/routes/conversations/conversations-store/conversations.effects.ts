import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs'

import { conversationsApiActions } from './actions/conversations-api.actions'
import { homePageActions } from './actions/home-page.actions'
import { selectConversations } from './conversations.selectors'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import { ConversationsService } from 'src/app/repositories/conversations/services/conversations.service'

@Injectable()
export class ConversationsEffects {
  private conversations$ = this.store.select(selectConversations)

  constructor(
    private actions$: Actions,
    private conversationsService: ConversationsService,
    private alertService: AlertService,
    private store: Store,
    private router: Router,
  ) {}

  public getConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homePageActions.getConversations),
      switchMap(() =>
        this.conversations$.pipe(
          take(1),
          filter(conversations => !conversations),
          switchMap(() => of(homePageActions.loadConversations({}))),
        ),
      ),
    ),
  )

  public updateConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homePageActions.updateConversations),
      switchMap(({ timer }) => of(homePageActions.loadConversations({ timer }))),
    ),
  )

  public loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homePageActions.loadConversations),
      switchMap(({ timer }) =>
        this.conversationsService.getConversations().pipe(
          map(({ count, conversations }) => conversationsApiActions.loadConversationsSuccess({ count, conversations })),
          tap(() => {
            timer?.()
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not load dialogs')

            return of(conversationsApiActions.loadConversationsFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public createConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homePageActions.createConversation),
      switchMap(({ uid }) =>
        this.conversationsService.createConversation(uid).pipe(
          map(id => conversationsApiActions.createConversationSuccess({ uid, id })),
          tap(({ id }) => {
            this.alertService.showSuccess('Dialog creation successful')
            this.router.navigate(['/conversations', id]).catch(console.error)
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not create dialog')

            return of(conversationsApiActions.createConversationFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
