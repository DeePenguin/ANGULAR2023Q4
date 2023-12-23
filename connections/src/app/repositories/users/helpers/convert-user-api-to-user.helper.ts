import type { UserApi } from '../models/user-api.model'
import type { User } from '../models/user.model'

export const convertUserApiToUser = ({ uid, name }: UserApi): User => ({
  uid: uid.S,
  name: name.S,
})
