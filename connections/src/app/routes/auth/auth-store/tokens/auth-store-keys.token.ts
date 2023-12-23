import { InjectionToken } from '@angular/core'

import type { AuthState } from '../models/auth-state.model'

export const AUTH_STORE_KEYS = new InjectionToken<Array<keyof AuthState>>('Auth Store Keys to be saved')
