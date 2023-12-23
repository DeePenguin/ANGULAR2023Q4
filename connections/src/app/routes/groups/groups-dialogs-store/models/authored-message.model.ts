import type { User } from 'src/app/repositories/users/models/user.model'

export interface AuthoredMessage {
  text: string
  createdAt: string
  author: User
  isOutComing: boolean
}
