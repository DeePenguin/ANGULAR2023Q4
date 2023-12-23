import { createActionGroup, props } from '@ngrx/store'

import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { Profile } from 'src/app/repositories/profile/models/profile.model'

export const profileApiActions = createActionGroup({
  source: 'Profile Api',
  events: {
    'Load Profile Success': props<{ profile: Profile }>(),
    'Load Profile Failure': props<{ error: ResponseError }>(),
    'Change Name Success': props<{ profile: Profile }>(),
    'Change Name Failure': props<{ error: ResponseError }>(),
  },
})
