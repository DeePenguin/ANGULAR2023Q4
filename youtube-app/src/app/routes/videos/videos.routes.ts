import type { Routes } from '@angular/router'

import { VideoPageComponent } from './pages/video-page/video-page/video-page.component'
import { VideosPageComponent } from './pages/videos-page/videos-page.component'
import { videoResolver } from './resolvers/video.resolver'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideosPageComponent,
  },
  {
    path: ':id',
    component: VideoPageComponent,
    resolve: { video: videoResolver },
  },
]
