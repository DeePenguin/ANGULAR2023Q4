import { createActionGroup, props } from '@ngrx/store'

import type { ResponseError } from 'src/app/common/models/response-error.model'

export const conversationsApiActions = createActionGroup({
  source: 'Conversations Api',
  events: {
    'Load Conversations Success': props<{ conversations: Record<string, string>; count: number }>(),
    'Load Conversations Failure': props<{ error: ResponseError }>(),
    'Create Conversation Success': props<{ id: string; uid: string }>(),
    'Create Conversation Failure': props<{ error: ResponseError }>(),
  },
})
