import type { VideoItem } from '../models/video/video-item.model'
import { sortMap } from './sort-map.helper'
import type { SortingOptions } from 'src/app/common/models/sorting-options.model'
import type { SortingCriteria } from 'src/app/core/models/sorting-criteria.model'

export const sortVideos = (videos: VideoItem[], sortBy?: SortingOptions<SortingCriteria[]>): VideoItem[] => {
  return sortBy ? [...videos].sort((a, b) => sortMap[sortBy.criterion](a, b) * sortBy.direction) : videos
}
