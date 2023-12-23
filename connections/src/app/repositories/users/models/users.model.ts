import type { User } from './user.model'

export interface Users {
  count: number
  userNames: Record<string, User>
}
