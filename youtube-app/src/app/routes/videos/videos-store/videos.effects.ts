import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, map, of, switchMap, take } from 'rxjs'

import { videosApiActions } from './actions/videos-api.actions'
import { videosActions } from './actions/videos.actions'
import { selectCustomVideos } from './videos.selectors'
import { YoutubeService } from 'src/app/repositories/youtube/services/youtube/youtube.service'

@Injectable()
export class VideosEffects {
  private customVideos$ = this.store.select(selectCustomVideos)

  constructor(
    private actions$: Actions,
    private youtubeService: YoutubeService,
    private store: Store,
  ) {}

  public getVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.getVideos),
      switchMap(({ searchQuery, pageToken }) =>
        this.youtubeService.getVideos({ searchQuery, pageToken }).pipe(
          map(pagedVideos => videosApiActions.loadVideosSuccess({ videos: pagedVideos })),
          catchError(({ message }: Error) => of(videosApiActions.loadVideosFailure({ error: message }))),
        ),
      ),
    ),
  )

  public getVideoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.getVideoById),
      switchMap(({ id }) =>
        this.youtubeService.getVideoById(id).pipe(
          map(video => videosApiActions.loadVideoByIdSuccess({ video })),
          catchError(({ message }: Error) => of(videosApiActions.loadVideoByIdFailure({ error: message }))),
        ),
      ),
    ),
  )

  public getFavoriteVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.getFavorites),
      switchMap(({ ids }) =>
        this.youtubeService.getVideosByIds(ids).pipe(
          map(videos => videosApiActions.loadFavoriteVideosSuccess({ videos })),
          catchError(({ message }: Error) => of(videosApiActions.loadFavoriteVideosFailure({ error: message }))),
        ),
      ),
    ),
  )

  public getCustomVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.getCustomVideo),
      switchMap(({ id }) =>
        this.customVideos$.pipe(
          take(1),
          map(videos => videos.find(video => video.id === id) || null),
          map(video =>
            video
              ? videosActions.setCustomVideo({ video })
              : videosActions.setCustomVideoError({ error: 'Video not found' }),
          ),
        ),
      ),
    ),
  )
}
