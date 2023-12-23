import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostBinding, Input, type OnInit } from '@angular/core'
import { TuiIslandModule } from '@taiga-ui/kit'

import { AuthoredMessage } from 'src/app/common/models/authored-message.model'

@Component({
  selector: 'cn-dialog-message',
  standalone: true,
  imports: [CommonModule, TuiIslandModule],
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMessageComponent implements OnInit {
  @Input() public message!: AuthoredMessage
  @HostBinding('class.outcome') public get isOutComing(): boolean {
    return this.message.isOutComing
  }
  public name: string = ''

  public ngOnInit(): void {
    this.name = this.message.isOutComing ? 'You' : this.message.author.name
  }
}
