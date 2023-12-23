import { createReducer, on } from '@ngrx/store'

import { authApiActions } from '../../auth/auth-store/actions/auth-api.actions'
import { profileApiActions } from './actions/profile-api.actions'
import { profileActions } from './actions/profile-page.actions'
import type { ProfileState } from './models/profile-state.model'

const profileInitialState: ProfileState = {
  isLoading: false,
  error: null,
  profile: null,
}

export const profileReducer = createReducer(
  profileInitialState,
  on(profileActions.loadProfile, profileActions.changeName, state => ({ ...state, isLoading: true })),
  on(profileApiActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    isLoading: false,
    error: null,
    profile,
  })),
  on(profileApiActions.loadProfileFailure, profileApiActions.changeNameFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(profileApiActions.changeNameSuccess, (state, { profile }) => ({
    ...state,
    isLoading: false,
    error: null,
    profile,
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...profileInitialState })),
)
