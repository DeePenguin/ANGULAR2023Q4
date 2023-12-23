import type { HttpInterceptorFn } from '@angular/common/http'

import { environment } from 'src/environments/environment'

export const youtubeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url?.startsWith('youtube')) {
    return next(req)
  }

  const URL = `${environment.baseUrl}${req.url.replace('youtube', '')}`
  const updatedRequest = req.clone({
    setParams: { key: environment.apiKey },
    url: URL,
  })

  return next(updatedRequest)
}
