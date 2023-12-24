import type { VideoState } from './video-state.model'
import type { VideosPaginationState } from './videos-pagination-state.mode'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

export interface VideosState {
  isLoading: boolean
  videos: VideoItem[]
  video: VideoState<VideoItem>
  error: string | null
  pagination: VideosPaginationState
  favorites: string[]
  favoriteVideos: VideoItem[]
  customVideos: CustomVideoItem[]
  customVideo: VideoState<CustomVideoItem>
}
