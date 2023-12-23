import type { VideoItemApi } from '../models/video/video-item-api.model'
import type { VideoItem } from '../models/video/video-item.model'
import { convertVideoStatisticsApiToVideoStatistics } from './convert-video-statistics-api-to-video-statistics.helper'

export const convertVideoItemApiToVideoItem = ({ id, snippet, statistics }: VideoItemApi): VideoItem => ({
  id,
  statistics: convertVideoStatisticsApiToVideoStatistics(statistics),
  thumbnails: snippet.thumbnails,
  title: snippet.title,
  channelTitle: snippet.channelTitle,
  description: snippet.description,
  publishedAt: snippet.publishedAt,
  tags: snippet.tags,
})
