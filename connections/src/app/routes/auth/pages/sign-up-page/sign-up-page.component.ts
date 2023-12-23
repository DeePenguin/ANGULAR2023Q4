import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'cn-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'page' },
})
export class SignUpPageComponent {}
