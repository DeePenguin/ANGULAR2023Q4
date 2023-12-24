import { createReducer, on } from '@ngrx/store'

import { videosApiActions } from './actions/videos-api.actions'
import { videosActions } from './actions/videos.actions'
import type { VideosPaginationState } from './models/videos-pagination-state.mode'
import type { VideosState } from './models/videos-state.model'

const paginationInitialState: VideosPaginationState = {
  length: 0,
  pageSize: 0,
  pageIndex: 0,
}

const videoInitialState = {
  isLoading: false,
  videoItem: null,
  error: null,
}

export const videosInitialState: VideosState = {
  isLoading: false,
  error: null,
  videos: [],
  video: videoInitialState,
  pagination: paginationInitialState,
  favorites: [],
  favoriteVideos: [],
  customVideos: [],
  customVideo: videoInitialState,
}

export const videosReducer = createReducer(
  videosInitialState,
  on(videosActions.getVideos, state => ({ ...state, isLoading: true })),
  on(videosApiActions.loadVideosSuccess, (state, { videos }) => ({
    ...state,
    isLoading: false,
    error: null,
    videos: videos.items,
    pagination: { ...state.pagination, ...videos.pagination },
  })),
  on(videosApiActions.loadVideosFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
  on(videosActions.getVideoById, state => ({
    ...state,
    video: { isLoading: true, error: null, videoItem: null },
  })),
  on(videosApiActions.loadVideoByIdSuccess, (state, { video }) => ({
    ...state,
    video: { ...state.video, isLoading: false, error: null, videoItem: video },
  })),
  on(videosApiActions.loadVideoByIdFailure, (state, { error }) => ({
    ...state,
    video: { ...state.video, isLoading: false, error, videoItem: null },
  })),
  on(videosActions.setCurrentVideo, (state, { video }) => ({
    ...state,
    video: { ...state.video, error: null, videoItem: video },
  })),
  on(videosActions.changePage, (state, { pageIndex }) => ({
    ...state,
    pagination: { ...state.pagination, pageIndex },
  })),
  on(videosActions.resetPagination, state => ({
    ...state,
    pagination: paginationInitialState,
  })),
  on(videosActions.addFavorite, (state, { id }) => ({
    ...state,
    favorites: [...state.favorites, id],
  })),
  on(videosActions.removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(favorite => favorite !== id),
    favoriteVideos: state.favoriteVideos.filter(video => video.id !== id),
  })),
  on(videosActions.getFavorites, state => ({
    ...state,
    isLoading: true,
  })),
  on(videosApiActions.loadFavoriteVideosSuccess, (state, { videos }) => ({
    ...state,
    isLoading: false,
    error: null,
    favoriteVideos: videos,
  })),
  on(videosApiActions.loadFavoriteVideosFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(videosActions.addCustomVideo, (state, { video }) => ({
    ...state,
    customVideos: [...state.customVideos, video],
  })),
  on(videosActions.removeCustomVideo, (state, { id }) => ({
    ...state,
    customVideos: state.customVideos.filter(video => video.id !== id),
  })),
  on(videosActions.getCustomVideo, state => ({
    ...state,
    customVideo: { isLoading: true, error: null, videoItem: null },
  })),
  on(videosActions.setCustomVideo, (state, { video }) => ({
    ...state,
    customVideo: { isLoading: false, error: null, videoItem: video },
  })),
  on(videosActions.setCustomVideoError, (state, { error }) => ({
    ...state,
    customVideo: { isLoading: false, error, videoItem: null },
  })),
)
