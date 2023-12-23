import { createReducer, on } from '@ngrx/store'

import { authApiActions } from '../../auth/auth-store/actions/auth-api.actions'
import { dialogsApiActions } from './actions/dialogs-api.actions'
import { dialogsActions } from './actions/dialogs-page.actions'
import { mergeDialogUpdate } from './helpers/mergeDialogUpdate.helper'
import type { DialogsState } from './models/dialogs-state.model'

const dialogsInitialState: DialogsState = {
  isLoading: true,
  error: null,
  dialogs: {},
}

export const dialogsReducer = createReducer(
  dialogsInitialState,
  on(dialogsActions.loadMessages, dialogsActions.updateMessages, dialogsActions.sendMessage, state => ({
    ...state,
    isLoading: true,
  })),
  on(dialogsApiActions.loadMessagesSuccess, (state, { dialog, id }) => ({
    ...state,
    isLoading: false,
    error: null,
    dialogs: {
      ...state.dialogs,
      [id]: dialog,
    },
  })),
  on(
    dialogsApiActions.loadMessagesFailure,
    dialogsApiActions.updateMessagesFailure,
    dialogsApiActions.sendMessageFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
  on(dialogsApiActions.updateMessagesSuccess, (state, updates) => ({
    ...state,
    isLoading: false,
    error: null,
    dialogs: {
      ...state.dialogs,
      [updates.id]: mergeDialogUpdate(state.dialogs[updates.id], updates),
    },
  })),
  on(dialogsApiActions.sendMessageSuccess, state => ({
    ...state,
    isLoading: false,
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...dialogsInitialState })),
)
