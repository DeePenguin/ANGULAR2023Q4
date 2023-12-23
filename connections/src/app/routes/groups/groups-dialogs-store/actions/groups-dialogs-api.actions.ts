import { createActionGroup, emptyProps, props } from '@ngrx/store'

import type { AuthoredMessage } from '../models/authored-message.model'
import type { Dialog } from '../models/dialog.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'

export const groupsDialogsApiActions = createActionGroup({
  source: 'Groups Dialogs Api',
  events: {
    'Load Messages Success': props<{ dialog: Dialog; groupId: string }>(),
    'Load Messages Failure': props<{ error: ResponseError }>(),
    'Update Messages Success': props<{
      lastUpdate: string
      count: number
      messages: AuthoredMessage[]
      groupId: string
    }>(),
    'Update Messages Failure': props<{ error: ResponseError }>(),

    'Send Message Success': emptyProps(),
    'Send Message Failure': props<{ error: ResponseError }>(),
  },
})
