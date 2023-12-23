import { createActionGroup, props } from '@ngrx/store'

import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { Group } from 'src/app/repositories/groups/models/group.model'

export const groupsApiActions = createActionGroup({
  source: 'Groups Api',
  events: {
    'Load Groups Success': props<{ groups: Group[]; count: number }>(),
    'Load Groups Failure': props<{ error: ResponseError }>(),
    'Create Group Success': props<{ group: Group }>(),
    'Create Group Failure': props<{ error: ResponseError }>(),
    'Remove Group Success': props<{ id: string }>(),
    'Remove Group Failure': props<{ error: ResponseError }>(),
  },
})
