import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import type { UserWithDialog } from '../../conversations-store/models/user-with-dialog.model'

@Component({
  selector: 'cn-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsListComponent {
  @Input() public users: UserWithDialog[] = []
  @Output() public createDialog = new EventEmitter<string>()

  public trackByUid(_: number, { uid }: { uid: string }): string {
    return uid
  }

  public onCreateDialog(uid: string): void {
    this.createDialog.emit(uid)
  }
}
