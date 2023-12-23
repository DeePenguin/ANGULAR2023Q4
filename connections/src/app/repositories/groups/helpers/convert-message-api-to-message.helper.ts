import type { MessageApi } from '../models/message-api.model'
import type { Message } from '../models/message.model'

export const convertMessageApiToMessage = ({
  createdAt,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authorID,
  message,
}: MessageApi): Message => ({
  authorId: authorID.S,
  text: message.S,
  createdAt: createdAt.S,
})
