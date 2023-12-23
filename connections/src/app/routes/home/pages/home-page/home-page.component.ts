import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'cn-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'page page--fixed' },
})
export class HomePageComponent {}
