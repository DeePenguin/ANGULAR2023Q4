import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { type MetaReducer, StoreModule } from '@ngrx/store'

import { AuthEffects } from './auth.effects'
import { authReducer } from './auth.reducer'
import { AuthFacade } from './services/auth-facade.service'
import { AUTH_LOCAL_STORAGE_KEY } from './tokens/auth-local-storage-key.token'
import { AUTH_STORE_CONFIG_TOKEN } from './tokens/auth-store-config.token'
import { AUTH_STORE_KEYS } from './tokens/auth-store-keys.token'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { storageMetaReducer } from 'src/app/common/tools/storage-meta-reducer'
import { LocalStorageService } from 'src/app/core/storage/services/local-storage.service'
import { AuthorizationHttpService } from 'src/app/repositories/auth/services/authorization-http.service'
import { AuthorizationService } from 'src/app/repositories/auth/services/authorization.service'

function getAuthConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
): { metaReducers: MetaReducer[] } {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] }
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(StoreFeatureNames.AUTH, authReducer, AUTH_STORE_CONFIG_TOKEN),
    EffectsModule.forFeature(AuthEffects),
  ],
  providers: [
    AuthorizationHttpService,
    AuthorizationService,
    AuthFacade,
    LocalStorageService,
    { provide: AUTH_LOCAL_STORAGE_KEY, useValue: '__auth' },
    {
      provide: AUTH_STORE_KEYS,
      useValue: ['userCredentials'],
    },
    {
      provide: AUTH_STORE_CONFIG_TOKEN,
      deps: [AUTH_STORE_KEYS, AUTH_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getAuthConfig,
    },
  ],
})
export class AuthStoreModule {}
