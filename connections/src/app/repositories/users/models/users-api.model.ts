import type { UserApi } from './user-api.model'

/* eslint-disable @typescript-eslint/naming-convention */
export interface UsersApi {
  Items: UserApi[]
  Count: number
}
