import { ChangeDetectionStrategy, Component } from '@angular/core'
import type { PageEvent } from '@angular/material/paginator'

import { VideosFacade } from '../../videos-store/services/videos.facade'

@Component({
  selector: 'yt-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosPageComponent {
  public pagination$ = this.videosFacade.pagination$
  public customVideos$ = this.videosFacade.customVideos$

  constructor(private videosFacade: VideosFacade) {}

  public changePage({ pageIndex, previousPageIndex }: PageEvent): void {
    if (previousPageIndex === undefined) {
      return
    }

    previousPageIndex < pageIndex
      ? this.videosFacade.getNextPage(pageIndex)
      : this.videosFacade.getPreviousPage(pageIndex)
  }
}
