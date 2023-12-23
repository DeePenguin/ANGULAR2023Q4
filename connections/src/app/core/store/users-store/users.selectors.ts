import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { UsersState } from './models/users-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectUsersFeature = createFeatureSelector<UsersState>(StoreFeatureNames.USERS)

export const selectIsLoading = createSelector(selectUsersFeature, ({ isLoading }: UsersState) => isLoading)

export const selectError = createSelector(selectUsersFeature, ({ error }: UsersState) => error)

export const selectCount = createSelector(selectUsersFeature, ({ count }: UsersState) => count)

export const selectUserNames = createSelector(selectUsersFeature, ({ userNames }: UsersState) => userNames)
