import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LetDirective } from '@rx-angular/template/let'

import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service'

@Component({
  selector: 'yt-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [LetDirective, ButtonComponent, NgIf, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  public defaultUserName = 'Your Name'
  public userInfo$ = this.authService.userInfo$
  constructor(private authService: AuthorizationService) {}

  public logout(): void {
    this.authService.logout()
  }
}
