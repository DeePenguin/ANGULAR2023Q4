import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const profileActions = createActionGroup({
  source: 'Profile Page',
  events: {
    'Get Profile': emptyProps(),
    'Load Profile': emptyProps(),
    'Change Name': props<{ name: string }>(),
  },
})
