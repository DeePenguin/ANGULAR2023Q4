import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertPaginationApiToPagination } from '../../helpers/convert-pagination-api-to-pagination.helper'
import { convertVideoItemApiToVideoItem } from '../../helpers/convert-video-item-api-to-video-item.helper'
import type { PagedVideoItems } from '../../models/paged-video-items.model'
import type { VideoItem } from '../../models/video/video-item.model'
import { YoutubeHttpService } from '../youtube-http/youtube-http.service'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private youtubeHttpService: YoutubeHttpService) {}
  public getVideos({
    searchQuery,
    pageToken,
  }: {
    searchQuery?: string
    pageToken?: string
  }): Observable<PagedVideoItems> {
    return this.youtubeHttpService.getVideos(searchQuery || '', pageToken).pipe(
      map(({ items, pagination }) => ({
        items: convertArray(items, convertVideoItemApiToVideoItem) || [],
        pagination: convertPaginationApiToPagination(pagination),
      })),
    )
  }

  public getVideoById(id: string): Observable<VideoItem> {
    return this.youtubeHttpService.getVideosById(id).pipe(
      map(({ 0: video }) => {
        if (!video) {
          throw new Error('Item not found')
        }

        return convertVideoItemApiToVideoItem(video)
      }),
    )
  }

  public getVideosByIds(ids: string[]): Observable<VideoItem[]> {
    return this.youtubeHttpService
      .getVideosById(ids.join(','))
      .pipe(map(items => convertArray(items, convertVideoItemApiToVideoItem) || []))
  }
}
