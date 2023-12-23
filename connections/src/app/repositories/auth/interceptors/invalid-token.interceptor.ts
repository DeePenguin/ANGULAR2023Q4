import type { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

import type { ResponseError } from 'src/app/common/models/response-error.model'
import { AuthFacade } from 'src/app/routes/auth/auth-store/services/auth-facade.service'

const isTokenError = ({ error }: { error: ResponseError }): Boolean => {
  return error?.type === 'InvalidTokenException'
}

export const invalidTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authFacade = inject(AuthFacade)
  const router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isTokenError(error)) {
        authFacade.clearToken()
        router.navigate(['/auth']).catch(console.error)
      }

      return throwError(() => error)
    }),
  )
}
