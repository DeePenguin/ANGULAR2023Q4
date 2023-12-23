import type { VideoItem } from '../models/video/video-item.model'
import type { SortingCriteria } from 'src/app/core/models/sorting-criteria.model'

export const sortMap: Record<SortingCriteria, (a: VideoItem, b: VideoItem) => number> = {
  views: (a, b) => b.statistics.viewCount - a.statistics.viewCount,
  date: (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
}
