import { createReducer, on } from '@ngrx/store'

import { authApiActions } from '../../auth/auth-store/actions/auth-api.actions'
import { groupsApiActions } from './actions/groups-api.actions'
import { groupsActions } from './actions/groups-page.actions'
import type { GroupsState } from './models/groups-state.model'

const groupsInitialState: GroupsState = {
  isLoading: false,
  error: null,
  groups: null,
  count: 0,
}

export const groupsReducer = createReducer(
  groupsInitialState,
  on(
    groupsActions.loadGroups,
    groupsActions.updateGroups,
    groupsActions.createGroup,
    groupsActions.removeGroup,
    state => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(groupsApiActions.loadGroupsSuccess, (state, { count, groups }) => ({
    ...state,
    isLoading: false,
    error: null,
    count,
    groups,
  })),
  on(
    groupsApiActions.loadGroupsFailure,
    groupsApiActions.createGroupFailure,
    groupsApiActions.removeGroupFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
  on(groupsApiActions.createGroupSuccess, (state, { group }) => ({
    ...state,
    isLoading: false,
    error: null,
    count: state.count + 1,
    groups: state.groups ? [group, ...state.groups] : [group],
  })),
  on(groupsApiActions.removeGroupSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    error: null,
    count: state.count - 1,
    groups: state.groups?.filter(group => group.id !== id) ?? [],
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...groupsInitialState })),
)
