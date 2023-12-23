import type { AuthoredMessage } from 'src/app/common/models/authored-message.model'
import type { Dialog } from 'src/app/common/models/dialog.model'

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
