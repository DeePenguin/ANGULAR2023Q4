import { createActionGroup, emptyProps, props } from '@ngrx/store'

import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { UserCredentials } from 'src/app/repositories/auth/models/user-credentials.model'

export const authApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Sign Up Success': emptyProps(),
    'Sign Up Failure': props<{ error: ResponseError }>(),
    'Sign Up Email Duplicated': props<{ email: string }>(),
    'Sign In Success': props<{ userCredentials: UserCredentials }>(),
    'Sign In Failure': props<{ error: ResponseError }>(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: ResponseError }>(),
    'Invalid Token': emptyProps(),
  },
})
