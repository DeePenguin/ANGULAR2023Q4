import { InjectionToken } from '@angular/core'
import type { StoreConfig } from '@ngrx/store'

import type { VideosState } from '../models/videos-state.model'

export const VIDEOS_STORE_CONFIG_TOKEN = new InjectionToken<StoreConfig<VideosState>>('Videos Store Config Token')
