import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LetModule } from '@ngrx/component'
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule } from '@taiga-ui/core'

import { AuthFacade } from 'src/app/routes/auth/auth-store/services/auth-facade.service'

@Component({
  selector: 'cn-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, LetModule, TuiButtonModule, TuiHostedDropdownModule, TuiDataListModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public isAuthDropdownOpen = false
  public isAuthorized$ = this.authFacade.isAuthorized$
  public isLoading$ = this.authFacade.isLoading$

  constructor(private authFacade: AuthFacade) {}

  public selectAuthOption(): void {
    this.isAuthDropdownOpen = false
  }

  public signOut(): void {
    this.authFacade.signOut()
  }
}
