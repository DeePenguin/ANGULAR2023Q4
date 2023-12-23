import { inject } from '@angular/core'
import { type CanMatchFn, Router } from '@angular/router'
import { map, take } from 'rxjs'

import { AuthorizationService } from '../../services/authorization/authorization.service'

export const isAuthorizedGuard =
  (isAuthorizationRequired: boolean): CanMatchFn =>
  () => {
    const router = inject(Router)
    const redirectTo = router.createUrlTree(isAuthorizationRequired ? ['/auth'] : ['/'])

    return inject(AuthorizationService).userInfo$.pipe(
      take(1),
      map(userInfo => Boolean(userInfo) === isAuthorizationRequired || redirectTo),
    )
  }
