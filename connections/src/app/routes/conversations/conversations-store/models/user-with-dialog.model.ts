import type { User } from 'src/app/repositories/users/models/user.model'

export interface UserWithDialog extends User {
  dialog?: string
}
