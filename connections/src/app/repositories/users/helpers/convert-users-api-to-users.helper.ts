/* eslint-disable @typescript-eslint/naming-convention */
import type { User } from '../models/user.model'
import type { UsersApi } from '../models/users-api.model'
import type { Users } from '../models/users.model'
import { convertUserApiToUser } from './convert-user-api-to-user.helper'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

export const convertUsersApiToUsers = ({ Count, Items }: UsersApi): Users => ({
  count: Count,
  userNames: (convertArray(Items, convertUserApiToUser) || []).reduce((acc: Record<string, User>, user) => {
    acc[user.uid] = user

    return acc
  }, {}),
})
