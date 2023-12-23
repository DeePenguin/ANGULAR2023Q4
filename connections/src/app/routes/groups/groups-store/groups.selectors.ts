import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { GroupsState } from './models/groups-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectGroupsFeature = createFeatureSelector<GroupsState>(StoreFeatureNames.GROUPS)

export const selectIsLoading = createSelector(selectGroupsFeature, ({ isLoading }: GroupsState) => isLoading)

export const selectError = createSelector(selectGroupsFeature, ({ error }: GroupsState) => error)

export const selectCount = createSelector(selectGroupsFeature, ({ count }: GroupsState) => count)

export const selectGroups = createSelector(selectGroupsFeature, ({ groups }: GroupsState) => groups)
