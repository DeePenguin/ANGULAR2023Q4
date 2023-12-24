import type { PageInfo } from './page-info.model'
import type { SearchItemApi } from './search-item-api.model'

export interface VideosSearchResponse {
  kind: string
  etag: string
  items: SearchItemApi[]
  pageInfo: PageInfo
  nextPageToken?: string
  prevPageToken?: string
  regionCode: string
}
