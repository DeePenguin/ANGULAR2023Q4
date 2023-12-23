import { createActionGroup, props } from '@ngrx/store'

import type { SignUpData } from 'src/app/repositories/auth/models/sign-up-data.model'

export const signUpActions = createActionGroup({
  source: 'Sign Up Page',
  events: {
    'Sign Up': props<{ signUpData: SignUpData }>(),
  },
})
