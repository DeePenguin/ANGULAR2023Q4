import { createActionGroup, props } from '@ngrx/store'

export const dialogsActions = createActionGroup({
  source: 'Dialogs Page',
  events: {
    'Get Messages': props<{ id: string }>(),
    'Load Messages': props<{ id: string }>(),
    'Update Messages': props<{ id: string; updateTimer?: () => void }>(),
    'Send Message': props<{ id: string; message: string }>(),
    'Remove Dialog': props<{ id: string; successCallback?: () => void }>(),
  },
})
