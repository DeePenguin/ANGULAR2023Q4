import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import { groupsActions } from '../actions/groups-page.actions'
import { selectCount, selectError, selectGroups, selectIsLoading } from '../groups.selectors'

@Injectable()
export class GroupsFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public count$ = this.store.select(selectCount)
  public groups$ = this.store
    .select(selectGroups)
    .pipe(
      map(groups =>
        groups ? [...groups].sort((a, b) => Number(Boolean(b.isRemovable)) - Number(Boolean(a.isRemovable))) : [],
      ),
    )

  constructor(private store: Store) {}

  public getGroups(): void {
    this.store.dispatch(groupsActions.getGroups())
  }

  public updateGroups(timer: () => void): void {
    this.store.dispatch(groupsActions.updateGroups({ timer }))
  }

  public createGroup(name: string, successCallback: () => void, failureCallback: () => void): void {
    this.store.dispatch(groupsActions.createGroup({ name, successCallback, failureCallback }))
  }

  public removeGroup(id: string, successCallback?: () => void): void {
    this.store.dispatch(groupsActions.removeGroup({ id, successCallback }))
  }
}
