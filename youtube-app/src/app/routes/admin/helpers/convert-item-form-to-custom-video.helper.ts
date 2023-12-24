import type { ItemForm } from '../models/item-form.model'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'

export const convertItemFormToCustomVideo = ({
  title,
  description,
  imageLink,
  videoLink,
  creationDate,
  tags,
}: ItemForm): CustomVideoItem => ({
  id: Date.now().toString(),
  title,
  description,
  imageLink,
  videoLink,
  publishedAt: creationDate.toISOString(),
  tags,
})
