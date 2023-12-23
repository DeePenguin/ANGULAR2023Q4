import { createReducer, on } from '@ngrx/store'

import { usersApiActions } from './actions/users-api.actions'
import { usersActions } from './actions/users-page.actions'
import type { UsersState } from './models/users-state.model'
import { authApiActions } from 'src/app/routes/auth/auth-store/actions/auth-api.actions'

const usersInitialState: UsersState = {
  isLoading: false,
  error: null,
  userNames: null,
  count: 0,
}

export const usersReducer = createReducer(
  usersInitialState,
  on(usersActions.loadUsers, usersActions.updateUsers, state => ({
    ...state,
    isLoading: true,
  })),
  on(usersApiActions.loadUsersSuccess, (state, { count, userNames }) => ({
    ...state,
    isLoading: false,
    error: null,
    count,
    userNames,
  })),
  on(usersApiActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...usersInitialState })),
)
