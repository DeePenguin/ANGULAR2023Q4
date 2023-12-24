import { inject } from '@angular/core'
import { type ActivatedRouteSnapshot, type CanActivateFn, Router } from '@angular/router'
import { map, take } from 'rxjs'

import { VideosFacade } from '../videos-store/services/videos.facade'

export const doesCustomVideoExistGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const videosFacade = inject(VideosFacade)
  const id = route.paramMap.get('id')!
  const redirectTo = router.createUrlTree(['/not-found'])

  videosFacade.getCustomVideo(id)

  return videosFacade.customVideo$.pipe(
    take(1),
    map(video => (video.error ? redirectTo : true)),
  )
}
