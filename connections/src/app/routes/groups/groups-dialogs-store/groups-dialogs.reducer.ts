import { createReducer, on } from '@ngrx/store'

import { authApiActions } from '../../auth/auth-store/actions/auth-api.actions'
import { groupsDialogsApiActions } from './actions/groups-dialogs-api.actions'
import { groupsDialogsActions } from './actions/groups-dialogs-page.actions'
import { mergeDialogUpdate } from './helpers/mergeDialogUpdate.helper'
import type { GroupsDialogsState } from './models/groups-dialogs-state.model'

const groupsDialogsInitialState: GroupsDialogsState = {
  isLoading: true,
  error: null,
  dialogs: {},
}

export const groupsDialogsReducer = createReducer(
  groupsDialogsInitialState,
  on(
    groupsDialogsActions.loadMessages,
    groupsDialogsActions.updateMessages,
    groupsDialogsActions.sendMessage,
    state => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(groupsDialogsApiActions.loadMessagesSuccess, (state, { dialog, groupId }) => ({
    ...state,
    isLoading: false,
    error: null,
    dialogs: {
      ...state.dialogs,
      [groupId]: dialog,
    },
  })),
  on(
    groupsDialogsApiActions.loadMessagesFailure,
    groupsDialogsApiActions.updateMessagesFailure,
    groupsDialogsApiActions.sendMessageFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
  on(groupsDialogsApiActions.updateMessagesSuccess, (state, updates) => ({
    ...state,
    isLoading: false,
    error: null,
    dialogs: {
      ...state.dialogs,
      [updates.groupId]: mergeDialogUpdate(state.dialogs[updates.groupId], updates),
    },
  })),
  on(groupsDialogsApiActions.sendMessageSuccess, state => ({
    ...state,
    isLoading: false,
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...groupsDialogsInitialState })),
)
