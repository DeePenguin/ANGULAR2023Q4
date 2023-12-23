import type { GroupApi } from './group-api.model'

/* eslint-disable @typescript-eslint/naming-convention */
export interface GroupsApi {
  Count: number
  Items: GroupApi[]
}
