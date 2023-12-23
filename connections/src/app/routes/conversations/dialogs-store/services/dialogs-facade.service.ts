import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import { ConversationsFacade } from '../../conversations-store/services/conversations-facade.service'
import { dialogsActions } from '../actions/dialogs-page.actions'
import { selectDialogs, selectError, selectIsLoading } from '../dialogs.selectors'

@Injectable()
export class DialogsFacade {
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public dialogs$ = this.store.select(selectDialogs)
  public dialogDoesNotExist$ = this.error$.pipe(map(error => error?.type === 'InvalidIDException'))

  constructor(
    private store: Store,
    private conversationsFacade: ConversationsFacade,
  ) {}

  public getMessages(id: string): void {
    this.conversationsFacade.getConversations()
    this.store.dispatch(dialogsActions.getMessages({ id }))
  }

  public updateDialog(id: string, timer: () => void): void {
    this.store.dispatch(dialogsActions.updateMessages({ id, updateTimer: timer }))
  }

  public sendMessage(id: string, message: string): void {
    this.store.dispatch(dialogsActions.sendMessage({ id, message }))
  }

  public removeDialog(id: string, successCallback: () => void): void {
    this.store.dispatch(
      dialogsActions.removeDialog({
        id,
        successCallback: () => {
          this.conversationsFacade.removeConversation(id)
          successCallback()
        },
      }),
    )
  }
}
