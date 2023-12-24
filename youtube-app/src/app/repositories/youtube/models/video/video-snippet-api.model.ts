import type { VideoThumbnailSize } from './video-thumbnail-size.enum'
import type { VideoThumbnail } from './video-thumbnail.model'

export interface VideoSnippetApi {
  publishedAt: string
  channelId: string
  channelTitle: string
  title: string
  description: string
  thumbnails: Record<VideoThumbnailSize, VideoThumbnail | undefined>
  tags: string[]
  categoryId: string
  liveBroadcastContent: string
  defaultAudioLanguage: string
  localized: {
    title: string
    description: string
  }
}
