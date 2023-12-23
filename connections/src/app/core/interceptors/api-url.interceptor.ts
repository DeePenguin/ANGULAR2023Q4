import type { HttpInterceptorFn } from '@angular/common/http'

import { environment } from 'src/environments/environment'

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const URL = `${environment.apiUrl}${req.url}`
  const updatedRequest = req.clone({
    url: URL,
  })

  return next(updatedRequest)
}
