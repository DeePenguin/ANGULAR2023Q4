import type { ConversationsApi } from '../models/conversations-api.model'
import type { Conversations } from '../models/conversations.model'
import { convertConversationApiToConversation } from './convert-conversation-api-to-conversation.helper'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const convertConversationsApiToConversations = ({ Count, Items }: ConversationsApi): Conversations => ({
  count: Count,
  conversations: (convertArray(Items, convertConversationApiToConversation) || []).reduce(
    (acc: Record<string, string>, conversation) => {
      acc[conversation.uid] = conversation.id

      return acc
    },
    {},
  ),
})
