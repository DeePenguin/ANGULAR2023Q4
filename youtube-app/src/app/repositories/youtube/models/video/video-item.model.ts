import type { VideoStatistics } from './video-statistics.model'
import type { VideoThumbnailSize } from './video-thumbnail-size.enum'
import type { VideoThumbnail } from './video-thumbnail.model'

export interface VideoItem {
  id: string
  channelTitle: string
  description: string
  title: string
  publishedAt: string
  thumbnails: Partial<Record<VideoThumbnailSize, VideoThumbnail>>
  statistics: VideoStatistics
  tags: string[]
}
