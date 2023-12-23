import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'

import type { VideoItemApi } from '../../models/video/video-item-api.model'
import type { VideosResponse } from '../../models/videos-response.model'
import type { VideosSearchResponse } from '../../models/videos-search-response.model'

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  constructor(private http: HttpClient) {}

  public getVideos(searchQuery?: string): Observable<VideoItemApi[]> {
    const params = new HttpParams()
      .set('q', searchQuery || '')
      .set('type', 'video')
      .set('maxResults', '15')

    return this.http.get<VideosSearchResponse>(`youtube/search`, { params }).pipe(
      map(({ items }) => items),
      map(items => items.map(item => item.id.videoId).join(',')),
      switchMap(ids => this.getVideosById(ids)),
    )
  }

  public getVideosById(ids: string): Observable<VideoItemApi[]> {
    const params = new HttpParams().set('id', ids).set('part', 'snippet,statistics')

    return this.http.get<VideosResponse>(`youtube/videos`, { params }).pipe(map(({ items }) => items))
  }
}
