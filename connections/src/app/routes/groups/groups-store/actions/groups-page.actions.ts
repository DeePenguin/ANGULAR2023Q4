import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const groupsActions = createActionGroup({
  source: 'Groups Page',
  events: {
    'Get Groups': emptyProps(),
    'Load Groups': emptyProps(),
    'Update Groups': props<{ timer: () => void }>(),
    'Create Group': props<{ name: string; successCallback: () => void; failureCallback: () => void }>(),
    'Remove Group': props<{ id: string; successCallback?: () => void }>(),
  },
})
