import { createActionGroup, emptyProps, props } from '@ngrx/store'

import type { AuthoredMessage } from 'src/app/common/models/authored-message.model'
import type { Dialog } from 'src/app/common/models/dialog.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'

export const dialogsApiActions = createActionGroup({
  source: 'Dialogs Api',
  events: {
    'Load Messages Success': props<{ dialog: Dialog; id: string }>(),
    'Load Messages Failure': props<{ error: ResponseError }>(),
    'Update Messages Success': props<{
      lastUpdate: string
      count: number
      messages: AuthoredMessage[]
      id: string
    }>(),
    'Update Messages Failure': props<{ error: ResponseError }>(),
    'Send Message Success': emptyProps(),
    'Send Message Failure': props<{ error: ResponseError }>(),
    'Remove Dialog Success': props<{ id: string }>(),
    'Remove Dialog Failure': props<{ error: ResponseError }>(),
  },
})
