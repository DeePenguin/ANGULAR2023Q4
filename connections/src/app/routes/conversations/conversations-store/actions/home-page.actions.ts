import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const homePageActions = createActionGroup({
  source: 'Home Page',
  events: {
    'Get Conversations': emptyProps(),
    'Load Conversations': props<{ timer?: () => void }>(),
    'Update Conversations': props<{ timer: () => void }>(),
    'Create Conversation': props<{ uid: string }>(),
  },
})
