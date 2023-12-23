import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { DialogMessageComponent } from '../dialog-message/dialog-message.component'
import type { AuthoredMessage } from 'src/app/common/models/authored-message.model'

@Component({
  selector: 'cn-dialog-messages',
  standalone: true,
  imports: [CommonModule, DialogMessageComponent],
  templateUrl: './dialog-messages.component.html',
  styleUrls: ['./dialog-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMessagesComponent {
  @Input() public messages: AuthoredMessage[] = []

  public trackByCreationTime(_: number, { createdAt }: AuthoredMessage): string {
    return createdAt
  }
}
