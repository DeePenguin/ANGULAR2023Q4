import { inject } from '@angular/core'
import { type ResolveFn, Router } from '@angular/router'
import { catchError, EMPTY } from 'rxjs'

import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'
import { YoutubeService } from 'src/app/repositories/youtube/services/youtube/youtube.service'

export const videoResolver: ResolveFn<VideoItem> = route => {
  const id = route.paramMap.get('id')!
  const router = inject(Router)

  return inject(YoutubeService)
    .getVideoById(id)
    .pipe(
      catchError(() => {
        router.navigate(['not-found']).catch(console.error)

        return EMPTY
      }),
    )
}
