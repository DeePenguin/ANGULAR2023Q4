import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { DialogsState } from './models/dialogs-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectDialogsFeature = createFeatureSelector<DialogsState>(StoreFeatureNames.DIALOGS)

export const selectIsLoading = createSelector(selectDialogsFeature, ({ isLoading }: DialogsState) => isLoading)

export const selectError = createSelector(selectDialogsFeature, ({ error }: DialogsState) => error)

export const selectDialogs = createSelector(selectDialogsFeature, ({ dialogs }: DialogsState) => dialogs)
