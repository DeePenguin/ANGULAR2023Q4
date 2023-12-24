import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'yt-fav-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent {
  @Input() public isFavorite = false

  public get icon(): string {
    return this.isFavorite ? 'favorite' : 'favorite_outline'
  }
}
