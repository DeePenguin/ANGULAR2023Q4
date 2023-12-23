import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'cn-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'page' },
})
export class ProfilePageComponent {}
