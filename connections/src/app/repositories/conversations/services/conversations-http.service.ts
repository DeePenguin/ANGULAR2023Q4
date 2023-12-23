import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { MessagesApi } from '../../groups/models/messages-api.model'
import type { ConversationNewApi } from '../models/conversation-new-api.model'
import type { ConversationsApi } from '../models/conversations-api.model'

@Injectable()
export class ConversationsHttpService {
  constructor(private http: HttpClient) {}

  public getConversations(): Observable<ConversationsApi> {
    return this.http.get<ConversationsApi>('/conversations/list')
  }

  public createConversation(uid: string): Observable<ConversationNewApi> {
    return this.http.post<ConversationNewApi>('/conversations/create', { companion: uid })
  }

  public removeConversation(id: string): Observable<unknown> {
    return this.http.delete('/conversations/delete', { params: { conversationID: id } })
  }

  public getMessages(id: string, since: string): Observable<MessagesApi> {
    return this.http.get<MessagesApi>('/conversations/read', { params: { conversationID: id, since } })
  }

  public sendMessage(id: string, message: string): Observable<unknown> {
    return this.http.post<unknown>('/conversations/append', { conversationID: id, message })
  }
}
