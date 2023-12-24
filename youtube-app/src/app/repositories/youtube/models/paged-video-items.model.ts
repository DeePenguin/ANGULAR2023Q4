import type { Pagination } from './pagination.model'
import type { VideoItem } from './video/video-item.model'

export interface PagedVideoItems {
  items: VideoItem[]
  pagination: Pagination
}
