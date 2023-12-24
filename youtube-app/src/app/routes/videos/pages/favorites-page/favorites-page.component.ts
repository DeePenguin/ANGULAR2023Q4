import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core'

import { VideosFacade } from '../../videos-store/services/videos.facade'

@Component({
  selector: 'yt-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  constructor(private videosFacade: VideosFacade) {}
  public ngOnInit(): void {
    this.videosFacade.getFavorites()
  }
}
