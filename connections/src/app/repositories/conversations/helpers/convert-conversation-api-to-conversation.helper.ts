/* eslint-disable @typescript-eslint/naming-convention */
import type { ConversationApi } from '../models/conversation-api.model'
import type { Conversation } from '../models/conversation.model'

export const convertConversationApiToConversation = ({ companionID, id }: ConversationApi): Conversation => ({
  uid: companionID.S,
  id: id.S,
})
