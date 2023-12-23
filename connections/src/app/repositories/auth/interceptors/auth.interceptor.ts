import type { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { switchMap, take } from 'rxjs'

import { AuthFacade } from 'src/app/routes/auth/auth-store/services/auth-facade.service'

const guestEndpoints = ['/login', '/registration']
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const { userCredentials$ } = inject(AuthFacade)

  if (guestEndpoints.includes(req.url)) {
    return next(req)
  }

  return userCredentials$.pipe(
    take(1),
    switchMap(userCredentials =>
      userCredentials
        ? next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${userCredentials.token}`,
                'rs-uid': userCredentials.uid,
                'rs-email': userCredentials.email,
              },
            }),
          )
        : next(req),
    ),
  )
}
