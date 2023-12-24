import { createActionGroup, emptyProps, props } from '@ngrx/store'

import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

export const videosActions = createActionGroup({
  source: 'Videos',
  events: {
    'Get Videos': props<{ searchQuery: string; pageToken?: string }>(),
    'Get Video By Id': props<{ id: string }>(),
    'Set Current Video': props<{ video: VideoItem }>(),
    'Change Page': props<{ pageIndex: number }>(),
    'Reset Pagination': emptyProps(),
    'Add Favorite': props<{ id: string }>(),
    'Remove Favorite': props<{ id: string }>(),
    'Get Favorites': props<{ ids: string[] }>(),
    'Add Custom Video': props<{ video: CustomVideoItem }>(),
    'Remove Custom Video': props<{ id: string }>(),
    'Get Custom Video': props<{ id: string }>(),
    'Set Custom Video': props<{ video: CustomVideoItem }>(),
    'Set Custom Video Error': props<{ error: string }>(),
  },
})
