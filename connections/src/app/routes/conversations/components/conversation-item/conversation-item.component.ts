import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { UserWithDialog } from '../../conversations-store/models/user-with-dialog.model'

@Component({
  selector: 'cn-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationItemComponent {
  @Input() public user!: UserWithDialog
  @Output() public createDialog = new EventEmitter<string>()

  public onClick(): void {
    this.createDialog.emit(this.user.uid)
  }
}
