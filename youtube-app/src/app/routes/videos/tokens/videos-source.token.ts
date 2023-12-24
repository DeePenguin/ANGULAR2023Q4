import { InjectionToken } from '@angular/core'

import type { VideosSources } from '../videos-store/models/videos-sources.model'

export const VIDEOS_SOURCE = new InjectionToken<VideosSources>('Key for videos source in store')
