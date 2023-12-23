import { createActionGroup, emptyProps } from '@ngrx/store'

export const usersActions = createActionGroup({
  source: 'Users Page',
  events: {
    'Get Users': emptyProps(),
    'Load Users': emptyProps(),
    'Update Users': emptyProps(),
  },
})
