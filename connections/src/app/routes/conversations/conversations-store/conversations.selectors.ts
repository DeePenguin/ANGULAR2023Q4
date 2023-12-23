import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { ConversationsState } from './models/conversations-state.model'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

const selectConversationsFeature = createFeatureSelector<ConversationsState>(StoreFeatureNames.CONVERSATIONS)

export const selectIsLoading = createSelector(
  selectConversationsFeature,
  ({ isLoading }: ConversationsState) => isLoading,
)

export const selectError = createSelector(selectConversationsFeature, ({ error }: ConversationsState) => error)

export const selectCount = createSelector(selectConversationsFeature, ({ count }: ConversationsState) => count)

export const selectConversations = createSelector(
  selectConversationsFeature,
  ({ conversations }: ConversationsState) => conversations,
)
