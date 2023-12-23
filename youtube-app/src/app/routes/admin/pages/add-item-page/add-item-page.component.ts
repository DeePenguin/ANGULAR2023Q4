import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'yt-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemPageComponent {}
