import type { VideosFacade } from '../services/videos.facade'

type SourceKeys = 'videos$' | 'video$' | 'favoriteVideos$' | 'customVideos$' | 'customVideo$'

export type VideosSources = keyof VideosFacade & SourceKeys
