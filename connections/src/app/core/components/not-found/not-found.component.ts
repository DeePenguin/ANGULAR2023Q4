import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiBlockStatusModule } from '@taiga-ui/layout'

@Component({
  selector: 'cn-not-found',
  standalone: true,
  imports: [CommonModule, TuiBlockStatusModule, RouterModule, TuiButtonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'page',
  },
})
export class NotFoundComponent {}
