import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { filter, map, take, tap, withLatestFrom } from 'rxjs'

import type { ToggleFavEvent } from '../../models/toggle-fav-event.model'
import { videosActions } from '../actions/videos.actions'
import type { VideosPaginationState } from '../models/videos-pagination-state.mode'
import {
  selectCustomVideo,
  selectCustomVideos,
  selectError,
  selectFavorites,
  selectFavoriteVideos,
  selectIsLoading,
  selectPagination,
  selectVideo,
  selectVideos,
} from '../videos.selectors'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Injectable()
export class VideosFacade {
  private searchQuery = ''
  public videos$ = this.store.select(selectVideos)
  public video$ = this.store.select(selectVideo)
  public isLoading$ = this.store.select(selectIsLoading)
  public error$ = this.store.select(selectError)
  public pagination$ = this.store.select(selectPagination)
  public favorites$ = this.store.select(selectFavorites)
  public favoriteVideos$ = this.store.select(selectFavoriteVideos)
  public customVideos$ = this.store.select(selectCustomVideos)
  public customVideo$ = this.store.select(selectCustomVideo)

  constructor(private store: Store) {}

  public changeSearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery
    this.store.dispatch(videosActions.resetPagination())
    this.getVideos()
  }

  public getCurrentVideo(id: string): void {
    this.videos$
      .pipe(
        take(1),
        map(videos => videos.find(video => video.id === id) || null),
        tap(video => {
          video ? this.setCurrentVideo(video) : this.getVideoById(id)
        }),
      )
      .subscribe()
      .unsubscribe()
  }

  public getCustomVideo(id: string): void {
    this.store.dispatch(videosActions.getCustomVideo({ id }))
  }

  public getNextPage(pageIndex: number): void {
    this.changePage(pageIndex, 'nextPageToken')
  }

  public getPreviousPage(pageIndex: number): void {
    this.changePage(pageIndex, 'prevPageToken')
  }

  private changePage(pageIndex: number, pageTokenKey: keyof VideosPaginationState): void {
    this.pagination$
      .pipe(
        take(1),
        map(pagination => pagination[pageTokenKey]),
        filter((token): token is string => Boolean(token)),
        tap(token => {
          this.store.dispatch(videosActions.changePage({ pageIndex }))
          this.getVideos(token)
        }),
      )
      .subscribe()
      .unsubscribe()
  }

  public toggleFavorite({ isFavorite, id }: ToggleFavEvent): void {
    this.store.dispatch(isFavorite ? videosActions.addFavorite({ id }) : videosActions.removeFavorite({ id }))
  }

  public getFavorites(): void {
    this.favorites$
      .pipe(
        take(1),
        withLatestFrom(this.favoriteVideos$),
        filter(([favorites, favoriteVideos]) => !favorites.every(id => favoriteVideos.some(video => video.id === id))),
        tap(([favorites]) => {
          this.store.dispatch(videosActions.getFavorites({ ids: favorites }))
        }),
      )
      .subscribe()
      .unsubscribe()
  }

  public addCustomVideo(video: CustomVideoItem): void {
    this.store.dispatch(videosActions.addCustomVideo({ video }))
  }

  public removeCustomVideo(id: string): void {
    this.store.dispatch(videosActions.removeCustomVideo({ id }))
  }

  private getVideos(pageToken?: string): void {
    this.store.dispatch(videosActions.getVideos({ searchQuery: this.searchQuery, pageToken }))
  }

  private getVideoById(id: string): void {
    this.store.dispatch(videosActions.getVideoById({ id }))
  }

  private setCurrentVideo(video: VideoItem): void {
    this.store.dispatch(videosActions.setCurrentVideo({ video }))
  }
}
