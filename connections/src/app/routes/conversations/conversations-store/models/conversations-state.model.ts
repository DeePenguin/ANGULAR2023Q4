import type { ResponseError } from 'src/app/common/models/response-error.model'

export interface ConversationsState {
  conversations: Record<string, string> | null
  count: number
  isLoading: boolean
  error: ResponseError | null
}
