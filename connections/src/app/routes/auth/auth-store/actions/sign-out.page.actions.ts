import { createActionGroup, emptyProps } from '@ngrx/store'

export const signOutActions = createActionGroup({
  source: 'Sign Out Page',
  events: {
    'Sign Out': emptyProps(),
  },
})
