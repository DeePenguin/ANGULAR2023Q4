import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { GroupsDialogsState } from './models/groups-dialogs-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectGroupsDialogsFeature = createFeatureSelector<GroupsDialogsState>(StoreFeatureNames.GROUPS_DIALOGS)

export const selectIsLoading = createSelector(
  selectGroupsDialogsFeature,
  ({ isLoading }: GroupsDialogsState) => isLoading,
)

export const selectError = createSelector(selectGroupsDialogsFeature, ({ error }: GroupsDialogsState) => error)

export const selectDialogs = createSelector(selectGroupsDialogsFeature, ({ dialogs }: GroupsDialogsState) => dialogs)
