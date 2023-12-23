import type { PageInfo } from './page-info.model'
import type { VideoItemApi } from './video/video-item-api.model'

export interface VideosResponse {
  kind: string
  etag: string
  items: VideoItemApi[]
  pageInfo: PageInfo
}
