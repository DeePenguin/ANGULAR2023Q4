import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs'

import { profileApiActions } from './actions/profile-api.actions'
import { profileActions } from './actions/profile-page.actions'
import { selectProfile } from './profile.selectors'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import { ProfileService } from 'src/app/repositories/profile/services/profile.service'

@Injectable()
export class ProfileEffects {
  private profile$ = this.store.select(selectProfile)

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private alertService: AlertService,
    private store: Store,
  ) {}

  public getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      switchMap(() =>
        this.profile$.pipe(
          take(1),
          filter(profile => !profile),
          switchMap(() => of(profileActions.loadProfile())),
        ),
      ),
    ),
  )

  public loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.loadProfile),
      switchMap(() =>
        this.profileService.getProfile().pipe(
          map(profile => profileApiActions.loadProfileSuccess({ profile })),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not load profile')

            return of(profileApiActions.loadProfileFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public changeName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.changeName),
      switchMap(({ name }) =>
        this.profile$.pipe(
          take(1),
          switchMap(profile =>
            this.profileService.changeName(name).pipe(
              map(() => {
                if (!profile) {
                  throw new Error('Profile not found')
                }

                return profileApiActions.changeNameSuccess({ profile: { ...profile, name } })
              }),
              tap(() => {
                this.alertService.showSuccess('Profile update successful')
              }),
              catchError(({ error }: { error: ResponseError }) => {
                this.alertService.showError(error.message, 'Profile update failed')

                return of(profileApiActions.changeNameFailure({ error }))
              }),
            ),
          ),
        ),
      ),
    ),
  )
}
