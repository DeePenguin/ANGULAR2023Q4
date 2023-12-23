import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core'
import type { Observable } from 'rxjs'

import type { Dialog } from '../../models/dialog.model'
import { ScrollableBlockComponent } from '../scrollable-block/scrollable-block.component'
import { UpdateButtonComponent } from '../update-button/update-button.component'
import { DialogFormComponent } from './components/dialog-form/dialog-form.component'
import { DialogMessagesComponent } from './components/dialog-messages/dialog-messages.component'

@Component({
  selector: 'cn-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiLoaderModule,
    TuiButtonModule,
    UpdateButtonComponent,
    DialogMessagesComponent,
    DialogFormComponent,
    ScrollableBlockComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() public dialog: Dialog | null = null
  @Input() public isLoading = false
  @Input() public updateTimer$: Observable<number> | null = null
  @Output() public update = new EventEmitter()
  @Output() public remove = new EventEmitter()
  @Output() public send = new EventEmitter<string>()

  public onUpdate(): void {
    this.update.emit()
  }

  public onRemove(): void {
    this.remove.emit()
  }

  public onSend({ message }: { message: string }): void {
    this.send.emit(message)
  }
}
