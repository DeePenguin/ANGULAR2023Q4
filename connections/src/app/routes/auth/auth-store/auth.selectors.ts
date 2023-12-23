import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { AuthState } from './models/auth-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectAuthFeature = createFeatureSelector<AuthState>(StoreFeatureNames.AUTH)

export const selectIsLoading = createSelector(selectAuthFeature, ({ isLoading }: AuthState) => isLoading)

export const selectError = createSelector(selectAuthFeature, ({ error }: AuthState) => error)

export const selectDuplicatedEmails = createSelector(
  selectAuthFeature,
  ({ duplicatedEmails }: AuthState) => duplicatedEmails,
)

export const selectUserCredentials = createSelector(
  selectAuthFeature,
  ({ userCredentials }: AuthState) => userCredentials,
)

export const selectUid = createSelector(selectUserCredentials, userCredentials => userCredentials?.uid ?? null)
