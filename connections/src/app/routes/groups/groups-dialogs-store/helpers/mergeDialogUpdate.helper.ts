import type { AuthoredMessage } from '../models/authored-message.model'
import type { Dialog } from '../models/dialog.model'

export const mergeDialogUpdate = (
  dialog: Dialog,
  {
    lastUpdate,
    count,
    messages,
  }: {
    lastUpdate: string
    count: number
    messages: AuthoredMessage[]
  },
): Dialog => ({
  ...dialog,
  lastUpdate,
  count: dialog.count + count,
  messages: [...dialog.messages, ...messages],
})
