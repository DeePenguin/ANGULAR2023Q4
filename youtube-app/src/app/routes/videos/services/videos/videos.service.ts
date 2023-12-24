import { Inject, Injectable } from '@angular/core'
import { combineLatest, map, type Observable } from 'rxjs'

import { VideosSources } from '../../videos-store/models/videos-sources.model'
import { FilterService } from 'src/app/core/services/filter/filter.service'
import { SortingService } from 'src/app/core/services/sorting/sorting.service'
import { filterVideos } from 'src/app/repositories/youtube/helpers/filter-videos.helper'
import { sortVideos } from 'src/app/repositories/youtube/helpers/sort-videos.helper'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'
import { VIDEOS_SOURCE } from 'src/app/routes/videos/tokens/videos-source.token'
import { VideosFacade } from 'src/app/routes/videos/videos-store/services/videos.facade'

@Injectable()
export class VideosService {
  private filterQuery$ = this.filterService.filterQuery$
  private sortingSettings$ = this.sortingService.sortingSettings$
  private videosFromStore$ = this.videosFacade[this.videosSource] as Observable<VideoItem[]>

  public videos$ = combineLatest([this.videosFromStore$, this.filterQuery$, this.sortingSettings$]).pipe(
    map(([videos, filterQuery, sortingSettings]) => ({ videos: filterVideos(videos, filterQuery), sortingSettings })),
    map(({ videos, sortingSettings }) => (sortingSettings ? sortVideos(videos, sortingSettings) : videos)),
  )

  constructor(
    private videosFacade: VideosFacade,
    private filterService: FilterService,
    private sortingService: SortingService,
    @Inject(VIDEOS_SOURCE) private videosSource: VideosSources,
  ) {}
}
