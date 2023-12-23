import { ChangeDetectionStrategy, Component } from '@angular/core'
import { combineLatest, map } from 'rxjs'

import { SortingService } from 'src/app/core/services/sorting/sorting.service'
import { VideosService } from 'src/app/core/services/videos/videos.service'
import { sortVideos } from 'src/app/repositories/youtube/helpers/sort-videos.helper'

@Component({
  selector: 'yt-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosPageComponent {
  private videos$ = this.videosService.videos$
  private sortingSettings$ = this.sortingService.sortingSettings$
  public sortedVideos$ = combineLatest([this.videos$, this.sortingSettings$]).pipe(
    map(([videos, sortingSettings]) => (sortingSettings ? sortVideos(videos, sortingSettings) : videos)),
  )

  constructor(
    private videosService: VideosService,
    private sortingService: SortingService,
  ) {}
}
