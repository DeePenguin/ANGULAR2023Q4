import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertVideoItemApiToVideoItem } from '../../helpers/convert-video-item-api-to-video-item.helper'
import type { VideoItem } from '../../models/video/video-item.model'
import { YoutubeHttpService } from '../youtube-http/youtube-http.service'
import { convertArray } from 'src/app/common/helpers/convert-array.helper'

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private youtubeHttpService: YoutubeHttpService) {}
  public getVideos(searchQuery?: string): Observable<VideoItem[]> {
    return this.youtubeHttpService
      .getVideos(searchQuery)
      .pipe(map(items => convertArray(items, convertVideoItemApiToVideoItem) || []))
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
}
