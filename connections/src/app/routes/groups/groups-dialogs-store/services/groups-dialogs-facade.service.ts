import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import { groupsDialogsActions } from '../actions/groups-dialogs-page.actions'
import { selectDialogs, selectError, selectIsLoading } from '../groups-dialogs.selectors'

@Injectable()
export class GroupsDialogsFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public dialogs$ = this.store.select(selectDialogs)
  public dialogDoesNotExist$ = this.error$.pipe(map(error => error?.type === 'InvalidIDException'))

  constructor(private store: Store) {}

  public getMessages(groupId: string): void {
    this.store.dispatch(groupsDialogsActions.getMessages({ groupId }))
  }

  public updateDialog(groupId: string, timer: () => void): void {
    this.store.dispatch(groupsDialogsActions.updateMessages({ groupId, updateTimer: timer }))
  }

  public sendMessage(groupId: string, message: string): void {
    this.store.dispatch(groupsDialogsActions.sendMessage({ groupId, message }))
  }
}
