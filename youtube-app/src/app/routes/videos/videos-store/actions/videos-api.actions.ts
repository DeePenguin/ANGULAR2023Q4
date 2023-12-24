import { createActionGroup, props } from '@ngrx/store'

import type { PagedVideoItems } from 'src/app/repositories/youtube/models/paged-video-items.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

export const videosApiActions = createActionGroup({
  source: 'Videos Api',
  events: {
    'Load Videos Success': props<{ videos: PagedVideoItems }>(),
    'Load Videos Failure': props<{ error: string }>(),
    'Load Video By Id Success': props<{ video: VideoItem }>(),
    'Load Video By Id Failure': props<{ error: string }>(),
    'Load Favorite Videos Success': props<{ videos: VideoItem[] }>(),
    'Load Favorite Videos Failure': props<{ error: string }>(),
  },
})
