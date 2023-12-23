import { createReducer, on } from '@ngrx/store'

import { authApiActions } from '../../auth/auth-store/actions/auth-api.actions'
import { conversationsApiActions } from './actions/conversations-api.actions'
import { dialogPageActions } from './actions/dialog-page.actions'
import { homePageActions } from './actions/home-page.actions'
import type { ConversationsState } from './models/conversations-state.model'

const conversationsInitialState: ConversationsState = {
  isLoading: false,
  error: null,
  conversations: null,
  count: 0,
}

export const conversationsReducer = createReducer(
  conversationsInitialState,
  on(homePageActions.loadConversations, homePageActions.createConversation, state => ({
    ...state,
    isLoading: true,
  })),
  on(conversationsApiActions.loadConversationsSuccess, (state, { count, conversations }) => ({
    ...state,
    isLoading: false,
    error: null,
    count,
    conversations,
  })),
  on(
    conversationsApiActions.loadConversationsFailure,
    conversationsApiActions.createConversationFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
  on(conversationsApiActions.createConversationSuccess, (state, { uid, id }) => ({
    ...state,
    isLoading: false,
    error: null,
    count: state.count + 1,
    conversations: { ...state.conversations, [uid]: id },
  })),

  on(dialogPageActions.removeConversation, (state, { id }) => ({
    ...state,
    conversations:
      state.conversations &&
      Object.fromEntries(Object.entries(state.conversations).filter(([, conversationId]) => conversationId !== id)),
  })),
  on(authApiActions.signOutSuccess, authApiActions.invalidToken, () => ({ ...conversationsInitialState })),
)
