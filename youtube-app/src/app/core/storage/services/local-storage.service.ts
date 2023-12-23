import { Inject, Injectable } from '@angular/core'

import { storageKeyPrefix } from '../tokens/storage-key.token'
import { windowGlobal } from '../tokens/window.token'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  public constructor(@Inject(windowGlobal) window: Window, @Inject(storageKeyPrefix) prefix: string) {
    super(window.localStorage, prefix)
  }
}
