import { createReducer, on } from '@ngrx/store'

import { authApiActions } from './actions/auth-api.actions'
import { signInActions } from './actions/sign-in-page.actions'
import { signOutActions } from './actions/sign-out.page.actions'
import { signUpActions } from './actions/sign-up-page.actions'
import type { AuthState } from './models/auth-state.model'

const authInitialState: AuthState = {
  isLoading: false,
  error: null,
  duplicatedEmails: [],
  userCredentials: null,
}

export const authReducer = createReducer(
  authInitialState,
  on(signUpActions.signUp, signInActions.signIn, signOutActions.signOut, state => ({ ...state, isLoading: true })),
  on(authApiActions.signUpSuccess, state => ({ ...state, isLoading: false, error: null })),
  on(authApiActions.signUpFailure, authApiActions.signInFailure, authApiActions.signOutFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(authApiActions.signUpEmailDuplicated, (state, { email }) => ({
    ...state,
    duplicatedEmails: [...state.duplicatedEmails, email],
  })),
  on(authApiActions.signInSuccess, (state, { userCredentials }) => ({
    ...state,
    isLoading: false,
    error: null,
    userCredentials,
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, state => ({
    ...state,
    isLoading: false,
    error: null,
    userCredentials: null,
  })),
)
