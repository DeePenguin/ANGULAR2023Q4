import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { GroupNewApi } from '../models/group-new-api'
import type { GroupsApi } from '../models/groups-api.model'
import type { MessagesApi } from '../models/messages-api.model'

@Injectable()
export class GroupsHttpService {
  constructor(private http: HttpClient) {}

  public getGroups(): Observable<GroupsApi> {
    return this.http.get<GroupsApi>('/groups/list')
  }

  public createGroup(name: string): Observable<GroupNewApi> {
    return this.http.post<GroupNewApi>('/groups/create', { name })
  }

  public removeGroup(id: string): Observable<unknown> {
    return this.http.delete('/groups/delete', { params: { groupID: id } })
  }

  public getMessages(groupId: string, since: string): Observable<MessagesApi> {
    return this.http.get<MessagesApi>('/groups/read', { params: { groupID: groupId, since } })
  }

  public sendMessage(groupId: string, message: string): Observable<unknown> {
    return this.http.post<unknown>('/groups/append', { groupID: groupId, message })
  }
}
