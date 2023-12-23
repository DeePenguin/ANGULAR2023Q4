import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { authApiActions } from './actions/auth-api.actions'
import { signInActions } from './actions/sign-in-page.actions'
import { signOutActions } from './actions/sign-out.page.actions'
import { signUpActions } from './actions/sign-up-page.actions'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import { AuthorizationService } from 'src/app/repositories/auth/services/authorization.service'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthorizationService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  public signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.signUp),
      switchMap(({ signUpData }) =>
        this.authService.signUp(signUpData).pipe(
          map(() => authApiActions.signUpSuccess()),
          tap(() => {
            this.alertService.showSuccess('Sign up successful')
            this.router.navigate(['/auth/sign-in']).catch(console.error)
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Sign up failed')

            return error.type === 'PrimaryDuplicationException'
              ? [
                  authApiActions.signUpFailure({ error }),
                  authApiActions.signUpEmailDuplicated({ email: signUpData.email }),
                ]
              : of(authApiActions.signUpFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInActions.signIn),
      switchMap(({ signInData }) =>
        this.authService.signIn(signInData).pipe(
          map(userCredentials => authApiActions.signInSuccess({ userCredentials })),
          tap(() => {
            this.alertService.showSuccess('Sign in successful')
            this.router.navigate(['/']).catch(console.error)
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Sign in failed')

            return of(authApiActions.signInFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutActions.signOut),
      switchMap(() =>
        this.authService.signOut().pipe(
          map(() => authApiActions.signOutSuccess()),
          tap(() => {
            this.alertService.showSuccess('Sign out successful')
            this.router.navigate(['/auth']).catch(console.error)
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Sign out failed')

            return of(authApiActions.signOutFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
