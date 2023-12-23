import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import { authApiActions } from '../actions/auth-api.actions'
import { signInActions } from '../actions/sign-in-page.actions'
import { signOutActions } from '../actions/sign-out.page.actions'
import { signUpActions } from '../actions/sign-up-page.actions'
import {
  selectDuplicatedEmails,
  selectError,
  selectIsLoading,
  selectUid,
  selectUserCredentials,
} from '../auth.selectors'
import type { SignInData } from 'src/app/repositories/auth/models/sign-in-data.model'
import type { SignUpData } from 'src/app/repositories/auth/models/sign-up-data.model'

@Injectable()
export class AuthFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public duplicatedEmails$ = this.store.select(selectDuplicatedEmails)
  public error$ = this.store.select(selectError)
  public userCredentials$ = this.store.select(selectUserCredentials)
  public uid$ = this.store.select(selectUid)
  public isAuthorized$ = this.userCredentials$.pipe(map(userCredentials => Boolean(userCredentials)))

  constructor(private store: Store) {}

  public signUp(signUpData: SignUpData): void {
    this.store.dispatch(signUpActions.signUp({ signUpData }))
  }

  public signIn(signInData: SignInData): void {
    this.store.dispatch(signInActions.signIn({ signInData }))
  }

  public signOut(): void {
    this.store.dispatch(signOutActions.signOut())
  }
  public clearToken(): void {
    this.store.dispatch(authApiActions.invalidToken())
  }
}
