import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'

import { usersActions } from '../actions/users-page.actions'
import { selectCount, selectError, selectIsLoading, selectUserNames } from '../users.selectors'

@Injectable()
export class UsersFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public count$ = this.store.select(selectCount)
  public userNames$ = this.store.select(selectUserNames)

  constructor(private store: Store) {}

  public getUsers(): void {
    this.store.dispatch(usersActions.getUsers())
  }

  public updateUsers(): void {
    this.store.dispatch(usersActions.updateUsers())
  }
}
