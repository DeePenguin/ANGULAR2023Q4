import { InjectionToken } from '@angular/core'

import type { VideosState } from '../models/videos-state.model'

export const VIDEOS_STORE_KEYS = new InjectionToken<Array<keyof VideosState>>('Videos Store Keys to be saved')
