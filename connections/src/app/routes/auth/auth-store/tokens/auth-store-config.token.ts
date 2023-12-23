import { InjectionToken } from '@angular/core'
import type { StoreConfig } from '@ngrx/store'

import type { AuthState } from '../models/auth-state.model'

export const AUTH_STORE_CONFIG_TOKEN = new InjectionToken<StoreConfig<AuthState>>('Auth Store Config Token')
