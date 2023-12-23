import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from 'rxjs'

import { groupsApiActions } from './actions/groups-api.actions'
import { groupsActions } from './actions/groups-page.actions'
import { selectGroups } from './groups.selectors'
import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AlertService } from 'src/app/core/services/alert.service'
import { GroupsService } from 'src/app/repositories/groups/services/groups.service'
import { selectUid } from 'src/app/routes/auth/auth-store/auth.selectors'

@Injectable()
export class GroupsEffects {
  private groups$ = this.store.select(selectGroups)
  private uid$ = this.store.select(selectUid)

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private alertService: AlertService,
    private store: Store,
  ) {}

  public getGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.getGroups),
      switchMap(() =>
        this.groups$.pipe(
          take(1),
          filter(groups => !groups),
          switchMap(() => of(groupsActions.loadGroups())),
        ),
      ),
    ),
  )

  public loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadGroups),
      withLatestFrom(this.uid$),
      filter(({ 1: uid }) => Boolean(uid)),
      switchMap(({ 1: uid }) =>
        this.groupsService.getGroups(uid!).pipe(
          map(({ count, groups }) => groupsApiActions.loadGroupsSuccess({ groups, count })),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not load groups')

            return of(groupsApiActions.loadGroupsFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public updateGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.updateGroups),
      withLatestFrom(this.uid$),
      map(({ 0: { timer }, 1: uid }) => ({ timer, uid })),
      filter(({ uid }) => Boolean(uid)),
      switchMap(({ timer, uid }) =>
        this.groupsService.getGroups(uid!).pipe(
          map(({ count, groups }) => groupsApiActions.loadGroupsSuccess({ groups, count })),
          tap(() => {
            timer()
            this.alertService.showSuccess('Groups update successful')
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not update groups')

            return of(groupsApiActions.loadGroupsFailure({ error }))
          }),
        ),
      ),
    ),
  )

  public createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.createGroup),
      withLatestFrom(this.uid$),
      map(({ 0: { name, successCallback, failureCallback }, 1: uid }) => ({
        name,
        successCallback,
        failureCallback,
        uid,
      })),
      filter(({ uid }) => Boolean(uid)),
      switchMap(({ name, successCallback, failureCallback, uid }) =>
        this.groupsService.createGroup(name, uid!).pipe(
          map(group => groupsApiActions.createGroupSuccess({ group })),
          tap(() => {
            successCallback()
            this.alertService.showSuccess('Groups creation successful')
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Could not create group')
            failureCallback()

            return of(groupsApiActions.createGroupFailure({ error }))
          }),
        ),
      ),
    ),
  )
  public removeGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.removeGroup),
      switchMap(({ id, successCallback }) =>
        this.groupsService.removeGroup(id).pipe(
          map(() => groupsApiActions.removeGroupSuccess({ id })),
          tap(() => {
            this.alertService.showSuccess('Groups removal successful')
            successCallback?.()
          }),
          catchError(({ error }: { error: ResponseError }) => {
            this.alertService.showError(error.message, 'Group removal failed')

            return of(groupsApiActions.removeGroupFailure({ error }))
          }),
        ),
      ),
    ),
  )
}
