import { CommonModule } from '@angular/common'
import { isDevMode, NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { type MetaReducer, StoreModule } from '@ngrx/store'

import { VideosFacade } from './services/videos.facade'
import { VIDEOS_LOCAL_STORAGE_KEY } from './tokens/videos-local-storage-key.token'
import { VIDEOS_STORE_CONFIG_TOKEN } from './tokens/videos-store-config.token'
import { VIDEOS_STORE_KEYS } from './tokens/videos-store-keys.token'
import { VideosEffects } from './videos.effects'
import { videosReducer } from './videos.reducers'
import { StoreFeaturesName } from 'src/app/common/models/store-features-name.enum'
import { storageMetaReducer } from 'src/app/common/tools/storage-metareducer'
import { LocalStorageService } from 'src/app/core/storage/services/local-storage.service'

function getVideosConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
): { metaReducers: MetaReducer[] } {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] }
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeaturesName.VIDEOS, videosReducer, VIDEOS_STORE_CONFIG_TOKEN),
    EffectsModule.forFeature(VideosEffects),
  ],
  providers: [
    VideosFacade,
    LocalStorageService,
    { provide: VIDEOS_LOCAL_STORAGE_KEY, useValue: '__videos' },
    {
      provide: VIDEOS_STORE_KEYS,
      useValue: isDevMode()
        ? ['favorites', 'videos', 'pagination', 'video', 'favoriteVideos', 'customVideos']
        : ['favorites', 'customVideos'],
    },
    {
      provide: VIDEOS_STORE_CONFIG_TOKEN,
      deps: [VIDEOS_STORE_KEYS, VIDEOS_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getVideosConfig,
    },
  ],
})
export class VideosStoreModule {}
