import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { ProfileState } from './models/profile-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectProfileFeature = createFeatureSelector<ProfileState>(StoreFeatureNames.PROFILE)

export const selectIsLoading = createSelector(selectProfileFeature, ({ isLoading }: ProfileState) => isLoading)

export const selectError = createSelector(selectProfileFeature, ({ error }: ProfileState) => error)

export const selectProfile = createSelector(selectProfileFeature, ({ profile }: ProfileState) => profile)
