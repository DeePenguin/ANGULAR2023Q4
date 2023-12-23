import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiLinkModule } from '@taiga-ui/core'

import { ProfileComponent } from './components/profile/profile.component'
import { ThemeComponent } from './components/theme/theme.component'

@Component({
  selector: 'cn-header',
  standalone: true,
  imports: [RouterModule, ProfileComponent, ThemeComponent, TuiLinkModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
