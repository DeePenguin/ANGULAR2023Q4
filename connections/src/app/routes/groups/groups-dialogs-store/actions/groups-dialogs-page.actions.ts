import { createActionGroup, props } from '@ngrx/store'

export const groupsDialogsActions = createActionGroup({
  source: 'Groups Dialogs Page',
  events: {
    'Get Messages': props<{ groupId: string }>(),
    'Load Messages': props<{ groupId: string }>(),
    'Update Messages': props<{ groupId: string; updateTimer?: () => void }>(),
    'Send Message': props<{ groupId: string; message: string }>(),
    'Remove Group': props<{ id: string }>(),
  },
})
