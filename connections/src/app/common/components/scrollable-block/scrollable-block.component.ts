import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TuiScrollbarModule } from '@taiga-ui/core'

@Component({
  selector: 'cn-scrollable-block',
  standalone: true,
  imports: [CommonModule, TuiScrollbarModule],
  templateUrl: './scrollable-block.component.html',
  styleUrls: ['./scrollable-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollableBlockComponent {
  @Input() public hasShadow = true
}
