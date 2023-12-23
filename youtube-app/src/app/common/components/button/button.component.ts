import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'yt-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public color: 'primary' | 'accent' | 'warn' | 'basic' = 'primary'
  @Input() public isDisabled = false
  @Input() public icon?: string
  @Input() public flatSide?: 'left' | 'right'
  @Input() public appearance: 'fab' | 'flat' | 'icon' = 'flat'
  @Input() public type: 'button' | 'submit' | 'reset' = 'button'
  @HostBinding('class.disabled') public get isDisabledValue(): boolean {
    return this.isDisabled
  }
}
