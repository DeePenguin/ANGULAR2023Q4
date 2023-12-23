import { Injectable } from '@angular/core'
import { combineLatest, map, shareReplay, switchMap } from 'rxjs'

import { FilterService } from '../filter/filter.service'
import { SearchService } from '../search/search.service'
import { filterVideos } from 'src/app/repositories/youtube/helpers/filter-videos.helper'
import { YoutubeService } from 'src/app/repositories/youtube/services/youtube/youtube.service'

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private searchQuery$ = this.searchService.searchQuery$
  private filterQuery$ = this.filterService.filterQuery$
  private foundVideos$ = this.searchQuery$.pipe(
    switchMap(searchQuery => this.youtubeService.getVideos(searchQuery)),
    shareReplay(1),
  )
  public videos$ = combineLatest([this.foundVideos$, this.filterQuery$]).pipe(
    map(([videos, filterQuery]) => filterVideos(videos, filterQuery)),
  )

  constructor(
    private youtubeService: YoutubeService,
    private searchService: SearchService,
    private filterService: FilterService,
  ) {}
}
