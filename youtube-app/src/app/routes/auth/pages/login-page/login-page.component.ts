import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'yt-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
