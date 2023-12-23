import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertMessageApiToMessage } from '../../groups/helpers/convert-message-api-to-message.helper'
import type { Messages } from '../../groups/models/messages.model'
import { convertConversationsApiToConversations } from '../helpers/convert-conversations-api-to-conversations.helper'
import type { Conversations } from '../models/conversations.model'
import { ConversationsHttpService } from './conversations-http.service'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

@Injectable()
export class ConversationsService {
  constructor(private conversationsHttpService: ConversationsHttpService) {}

  public getConversations(): Observable<Conversations> {
    return this.conversationsHttpService.getConversations().pipe(map(convertConversationsApiToConversations))
  }

  public createConversation(uid: string): Observable<string> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.conversationsHttpService.createConversation(uid).pipe(map(({ conversationID }) => conversationID))
  }

  public removeConversation(id: string): Observable<unknown> {
    return this.conversationsHttpService.removeConversation(id)
  }

  public getMessages(id: string, since: string = ''): Observable<Messages> {
    return this.conversationsHttpService.getMessages(id, since).pipe(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      map(({ Count, Items }) => ({
        count: Count,
        messages: (convertArray(Items, convertMessageApiToMessage) || []).sort(
          (a, b) => Number(a.createdAt) - Number(b.createdAt),
        ),
      })),
    )
  }

  public sendMessage(id: string, message: string): Observable<unknown> {
    return this.conversationsHttpService.sendMessage(id, message)
  }
}
