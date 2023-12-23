import type { MessageApi } from './message-api.model'

/* eslint-disable @typescript-eslint/naming-convention */
export interface MessagesApi {
  Count: number
  Items: MessageApi[]
}
