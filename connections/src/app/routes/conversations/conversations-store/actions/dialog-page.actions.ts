import { createActionGroup, props } from '@ngrx/store'

export const dialogPageActions = createActionGroup({
  source: 'Dialog Page',
  events: {
    'Remove Conversation': props<{ id: string }>(),
  },
})
