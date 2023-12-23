import type { GroupApi } from '../models/group-api.model'
import type { Group } from '../models/group.model'

export const convertGroupApiToGroup = ({ id, name, createdAt, createdBy, uid }: GroupApi & { uid: string }): Group => ({
  id: id.S,
  name: name.S,
  createdAt: createdAt.S,
  createdBy: createdBy.S,
  isRemovable: uid === createdBy.S,
})
