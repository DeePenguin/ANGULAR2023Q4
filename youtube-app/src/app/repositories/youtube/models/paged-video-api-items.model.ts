import type { PaginationApi } from './pagination-api.model'
import type { VideoItemApi } from './video/video-item-api.model'

export interface PagedVideoApiItems {
  items: VideoItemApi[]
  pagination: PaginationApi
}
