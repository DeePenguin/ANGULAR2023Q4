import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { UserCredentials } from 'src/app/repositories/auth/models/user-credentials.model'

export interface AuthState {
  isLoading: boolean
  error: ResponseError | null
  duplicatedEmails: string[]
  userCredentials: UserCredentials | null
}
