import type { ProfileApi } from '../models/profile-api.model'
import type { Profile } from '../models/profile.model'

export const convertProfileApiToProfile = ({ email, name, uid, createdAt }: ProfileApi): Profile => ({
  email: email.S,
  name: name.S,
  uid: uid.S,
  createdAt: createdAt.S,
})
