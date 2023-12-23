import { apiUrlInterceptor } from './api-url.interceptor'
import { authInterceptor } from 'src/app/repositories/auth/interceptors/auth.interceptor'
import { invalidTokenInterceptor } from 'src/app/repositories/auth/interceptors/invalid-token.interceptor'

export const httpInterceptors = [authInterceptor, apiUrlInterceptor, invalidTokenInterceptor]
