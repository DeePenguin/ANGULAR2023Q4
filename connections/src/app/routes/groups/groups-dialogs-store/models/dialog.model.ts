import type { AuthoredMessage } from './authored-message.model'

export interface Dialog {
  lastUpdate: string
  messages: AuthoredMessage[]
  count: number
  isRemovable: boolean
  name: string
}
