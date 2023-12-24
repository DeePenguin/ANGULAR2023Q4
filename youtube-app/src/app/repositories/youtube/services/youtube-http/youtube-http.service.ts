import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'

import type { PagedVideoApiItems } from '../../models/paged-video-api-items.model'
import type { VideoItemApi } from '../../models/video/video-item-api.model'
import type { VideosResponse } from '../../models/videos-response.model'
import type { VideosSearchResponse } from '../../models/videos-search-response.model'

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  private itemsPerPage = 20
  constructor(private http: HttpClient) {}

  public getVideos(searchQuery: string, pageToken?: string): Observable<PagedVideoApiItems> {
    const defaultParams = {
      q: searchQuery,
      type: 'video',
      maxResults: this.itemsPerPage,
    }

    const params = pageToken ? { pageToken, ...defaultParams } : defaultParams

    return this.http.get<VideosSearchResponse>(`youtube/search`, { params }).pipe(
      map(({ items, prevPageToken, nextPageToken, pageInfo }) => ({
        ids: items.map(item => item.id.videoId).join(','),
        pagination: { prevPageToken, nextPageToken, ...pageInfo },
      })),
      switchMap(({ ids, pagination }) => this.getVideosById(ids).pipe(map(items => ({ items, pagination })))),
    )
  }

  public getVideosById(ids: string): Observable<VideoItemApi[]> {
    const params = new HttpParams().set('id', ids).set('part', 'snippet,statistics')

    return this.http.get<VideosResponse>(`youtube/videos`, { params }).pipe(map(({ items }) => items))
  }
}
