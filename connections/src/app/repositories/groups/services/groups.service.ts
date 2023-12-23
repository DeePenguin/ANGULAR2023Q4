import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertGroupApiToGroup } from '../helpers/convert-group-api-to-group.helper'
import { convertNewGroupApiToGroup } from '../helpers/convert-group-new-api-to-group.helper'
import { convertMessageApiToMessage } from '../helpers/convert-message-api-to-message.helper'
import type { Group } from '../models/group.model'
import type { Groups } from '../models/groups.model'
import type { Messages } from '../models/messages.model'
import { GroupsHttpService } from './groups-http.service'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

@Injectable()
export class GroupsService {
  constructor(private groupsHttpService: GroupsHttpService) {}

  public getGroups(uid: string): Observable<Groups> {
    return this.groupsHttpService.getGroups().pipe(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      map(({ Count, Items }) => ({
        count: Count,
        groups:
          convertArray(
            Items.map(item => ({ ...item, uid })),
            convertGroupApiToGroup,
          ) || [],
      })),
    )
  }

  public createGroup(name: string, uid: string): Observable<Group> {
    return (
      this.groupsHttpService
        .createGroup(name)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .pipe(map(({ groupID }) => convertNewGroupApiToGroup({ groupID, name, uid })))
    )
  }

  public removeGroup(id: string): Observable<unknown> {
    return this.groupsHttpService.removeGroup(id)
  }

  public getMessages(groupId: string, since: string = ''): Observable<Messages> {
    return this.groupsHttpService.getMessages(groupId, since).pipe(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      map(({ Count, Items }) => ({
        count: Count,
        messages: (convertArray(Items, convertMessageApiToMessage) || []).sort(
          (a, b) => Number(a.createdAt) - Number(b.createdAt),
        ),
      })),
    )
  }

  public sendMessage(groupId: string, message: string): Observable<unknown> {
    return this.groupsHttpService.sendMessage(groupId, message)
  }
}
