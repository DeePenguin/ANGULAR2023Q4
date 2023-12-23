import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, combineLatest, filter, map, of, switchMap, take } from 'rxjs'

import { usersApiActions } from './actions/users-api.actions'
import { usersActions } from './actions/users-page.actions'
import { selectIsLoading, selectUserNames } from './users.selectors'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import { UsersService } from 'src/app/repositories/users/services/users.service'

@Injectable()
export class UsersEffects {
  private userNames$ = this.store.select(selectUserNames)
  private isLoading$ = this.store.select(selectIsLoading)
  private additionalInfo$ = combineLatest([this.userNames$, this.isLoading$]).pipe(
    map(([userNames, isLoading]) => ({ userNames, isLoading })),
  )

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private alertService: AlertService,
    private store: Store,
  ) {}

  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      switchMap(() =>
        this.additionalInfo$.pipe(
          take(1),
          filter(({ userNames, isLoading }) => !userNames && !isLoading),
          switchMap(() => of(usersActions.loadUsers())),
        ),
      ),
    ),
  )

  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map(({ count, userNames }) => usersApiActions.loadUsersSuccess({ userNames, count })),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not load users')

            return of(usersApiActions.loadUsersFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public updateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.updateUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map(({ count, userNames }) => usersApiActions.loadUsersSuccess({ userNames, count })),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not update users')

            return of(usersApiActions.loadUsersFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
