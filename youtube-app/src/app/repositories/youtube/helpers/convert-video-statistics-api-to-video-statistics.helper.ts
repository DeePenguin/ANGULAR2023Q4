import type { VideoStatisticsApi } from '../models/video/video-statistics-api.model'
import type { VideoStatistics } from '../models/video/video-statistics.model'

export const convertVideoStatisticsApiToVideoStatistics = ({
  viewCount,
  likeCount,
  commentCount,
  favoriteCount,
}: VideoStatisticsApi): VideoStatistics => ({
  viewCount: Number(viewCount) || 0,
  likeCount: Number(likeCount) || 0,
  commentCount: Number(commentCount) || 0,
  favoriteCount: Number(favoriteCount) || 0,
})
