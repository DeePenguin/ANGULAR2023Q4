import type { ResponseError } from 'src/app/common/models/response-error.model'
import type { Group } from 'src/app/repositories/groups/models/group.model'

export interface GroupsState {
  groups: Group[] | null
  count: number
  isLoading: boolean
  error: ResponseError | null
}
