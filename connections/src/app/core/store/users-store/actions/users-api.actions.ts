import { createActionGroup, props } from '@ngrx/store'

import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { Users } from 'src/app/repositories/users/models/users.model'

export const usersApiActions = createActionGroup({
  source: 'Users Api',
  events: {
    'Load Users Success': props<{ userNames: Users['userNames']; count: Users['count'] }>(),
    'Load Users Failure': props<{ error: ResponseError }>(),
  },
})
