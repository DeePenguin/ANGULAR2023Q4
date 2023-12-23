/* eslint-disable @typescript-eslint/naming-convention */
import type { ConversationApi } from './conversation-api.model'

export interface ConversationsApi {
  Count: number
  Items: ConversationApi[]
}
