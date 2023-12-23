import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { Profile } from 'src/app/repositories/profile/models/profile.model'

export interface ProfileState {
  isLoading: boolean
  error: ResponseError | null
  profile: Profile | null
}
