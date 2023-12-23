import type { Dialog } from '../models/dialog.model'
import { convertMessageToAuthoredMessage } from './convert-message-to-authored-message.helper'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import type { Group } from 'src/app/repositories/groups/models/group.model'
import type { Messages } from 'src/app/repositories/groups/models/messages.model'

export const convertMessagesToDialog = (
  { count, messages }: Messages,
  uid: string,
  userNames: UserNames,
  group?: Group,
): Dialog => {
  const authoredMessages =
    convertArray(
      messages.map(message => ({ ...message, uid, userNames })),
      convertMessageToAuthoredMessage,
    ) || []

  const lastUpdate = authoredMessages[authoredMessages.length - 1]?.createdAt ?? Date.now().toString()

  return {
    count,
    messages: authoredMessages,
    lastUpdate,
    isRemovable: group?.isRemovable ?? false,
    name: group?.name ?? '',
  }
}
