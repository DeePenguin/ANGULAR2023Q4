import { convertMessageToAuthoredMessage } from './convert-message-to-authored-message.helper'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'
import type { Dialog } from 'src/app/common/models/dialog.model'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import type { Messages } from 'src/app/repositories/groups/models/messages.model'

export const convertMessagesToDialog = ({
  count,
  messages,
  id,
  uid,
  userNames,
  conversations,
}: Messages & {
  uid: string
  id: string
  userNames: UserNames
  conversations: Record<string, string>
}): Dialog => {
  const authoredMessages =
    convertArray(
      messages.map(message => ({ ...message, uid, userNames })),
      convertMessageToAuthoredMessage,
    ) || []

  const companionId = Object.keys(conversations).find(key => conversations[key] === id)
  const name = (companionId && userNames[companionId]?.name) || 'Unknown'

  const lastUpdate = authoredMessages[authoredMessages.length - 1]?.createdAt ?? Date.now().toString()

  return { count, messages: authoredMessages, lastUpdate, isRemovable: true, name }
}
