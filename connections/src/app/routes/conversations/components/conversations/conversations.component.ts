import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ConversationsFacade } from '../../conversations-store/services/conversations-facade.service'
import { TimerService } from 'src/app/core/services/timer.service'

@Component({
  selector: 'cn-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent {
  private usersTimer = this.timerService.createTimer('users')
  public isLoading$ = this.conversationsFacade.isLoading$
  public timer$ = this.usersTimer.timer$
  public users$ = this.conversationsFacade.users$

  constructor(
    private conversationsFacade: ConversationsFacade,
    private timerService: TimerService,
  ) {
    this.conversationsFacade.getConversations()
  }

  public updateList(): void {
    this.conversationsFacade.updateConversations(() => {
      this.usersTimer.start()
    })
  }

  public createDialog(uid: string): void {
    this.conversationsFacade.createConversation(uid)
  }
}
