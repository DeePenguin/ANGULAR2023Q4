import type { AuthoredMessage } from 'src/app/common/models/authored-message.model'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import type { Message } from 'src/app/repositories/groups/models/message.model'

export const convertMessageToAuthoredMessage = ({
  text,
  createdAt,
  authorId,
  uid,
  userNames,
}: Message & { uid: string; userNames: UserNames }): AuthoredMessage => ({
  text,
  createdAt,
  author: userNames[authorId] ?? { name: 'Unknown', uid: authorId },
  isOutComing: authorId === uid,
})
