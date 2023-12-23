import { inject } from '@angular/core'
import { type CanMatchFn, Router } from '@angular/router'
import { map, take } from 'rxjs'

import { AuthFacade } from 'src/app/routes/auth/auth-store/services/auth-facade.service'

export const isAuthorizedGuard =
  (isAuthorizationRequired: boolean): CanMatchFn =>
  () => {
    const router = inject(Router)
    const redirectTo = router.createUrlTree(isAuthorizationRequired ? ['/auth'] : ['/'])

    return inject(AuthFacade).isAuthorized$.pipe(
      take(1),
      map(isAuthorized => isAuthorized === isAuthorizationRequired || redirectTo),
    )
  }
