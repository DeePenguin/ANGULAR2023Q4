import { inject } from '@angular/core'
import { type ActivatedRouteSnapshot, type CanActivateFn, Router } from '@angular/router'
import { filter, map, take } from 'rxjs'

import { VideosFacade } from '../videos-store/services/videos.facade'

export const doesVideoExistGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const videosFacade = inject(VideosFacade)
  const id = route.paramMap.get('id')!
  const redirectTo = router.createUrlTree(['/not-found'])

  videosFacade.getCurrentVideo(id)

  return videosFacade.video$.pipe(
    filter(({ isLoading }) => !isLoading),
    take(1),
    map(video => (video.error ? redirectTo : true)),
  )
}
