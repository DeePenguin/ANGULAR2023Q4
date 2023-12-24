import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { VideosState } from './models/videos-state.model'
import { StoreFeaturesName } from 'src/app/common/models/store-features-name.enum'

const selectVideosFeature = createFeatureSelector<VideosState>(StoreFeaturesName.VIDEOS)

export const selectError = createSelector(selectVideosFeature, ({ error }: VideosState) => error)

export const selectVideos = createSelector(selectVideosFeature, ({ videos }: VideosState) => videos)

export const selectVideo = createSelector(selectVideosFeature, ({ video }: VideosState) => video)

export const selectIsLoading = createSelector(selectVideosFeature, ({ isLoading }: VideosState) => isLoading)

export const selectPagination = createSelector(selectVideosFeature, ({ pagination }: VideosState) => pagination)

export const selectFavorites = createSelector(selectVideosFeature, ({ favorites }: VideosState) => favorites)

export const selectFavoriteVideos = createSelector(
  selectVideosFeature,
  ({ favoriteVideos }: VideosState) => favoriteVideos,
)

export const selectCustomVideos = createSelector(selectVideosFeature, ({ customVideos }: VideosState) => customVideos)

export const selectCustomVideo = createSelector(selectVideosFeature, ({ customVideo }: VideosState) => customVideo)
