import { type ModuleWithProviders, NgModule } from '@angular/core'

import type { StorageModuleConfig } from './models/storage-config.model'
import { storageKeyPrefix } from './tokens/storage-key.token'
import { windowGlobal } from './tokens/window.token'

@NgModule({})
export class StorageModule {
  public static forRoot({ config }: { config: StorageModuleConfig }): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: windowGlobal,
          useFactory: () => window,
        },
        {
          provide: storageKeyPrefix,
          useValue: config.prefix || '',
        },
      ],
    }
  }
}
