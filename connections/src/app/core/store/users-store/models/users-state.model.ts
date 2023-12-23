import type { UserNames } from './user-names.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'

export interface UsersState {
  isLoading: boolean
  error: ResponseError | null
  userNames: UserNames | null
  count: number
}
