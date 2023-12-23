import { createActionGroup, props } from '@ngrx/store'

import type { SignInData } from 'src/app/repositories/auth/models/sign-in-data.model'

export const signInActions = createActionGroup({
  source: 'Sign In Page',
  events: {
    'Sign In': props<{ signInData: SignInData }>(),
  },
})
