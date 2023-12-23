import type { VideoSnippetApi } from './video-snippet-api.model'
import type { VideoStatisticsApi } from './video-statistics-api.model'

export interface VideoItemApi {
  kind: string
  etag: string
  id: string
  snippet: VideoSnippetApi
  statistics: VideoStatisticsApi
}
