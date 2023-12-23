import type { GroupNewApi } from '../models/group-new-api'
import type { Group } from '../models/group.model'

export const convertNewGroupApiToGroup = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  groupID,
  name,
  uid,
}: GroupNewApi & { uid: string; name: string }): Group => ({
  id: groupID,
  name,
  createdAt: Date.now().toString(),
  createdBy: uid,
  isRemovable: true,
})
