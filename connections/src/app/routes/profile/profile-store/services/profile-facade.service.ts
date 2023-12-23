import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'

import { profileActions } from '../actions/profile-page.actions'
import { selectError, selectIsLoading, selectProfile } from '../profile.selectors'

@Injectable()
export class ProfileFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public profile$ = this.store.select(selectProfile)

  constructor(private store: Store) {}

  public getProfile(): void {
    this.store.dispatch(profileActions.getProfile())
  }

  public changeName(name: string): void {
    this.store.dispatch(profileActions.changeName({ name }))
  }
}
