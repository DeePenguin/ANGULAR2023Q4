import type { Routes } from '@angular/router'

import { doesCustomVideoExistGuard } from './guards/custom-video.guard'
import { doesVideoExistGuard } from './guards/video.guard'
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component'
import { VideoPageComponent } from './pages/video-page/video-page/video-page.component'
import { VideosPageComponent } from './pages/videos-page/videos-page.component'
import { VideosService } from './services/videos/videos.service'
import { VIDEOS_SOURCE } from './tokens/videos-source.token'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideosPageComponent,
    providers: [VideosService, { provide: VIDEOS_SOURCE, useValue: 'videos$' }],
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    providers: [VideosService, { provide: VIDEOS_SOURCE, useValue: 'favoriteVideos$' }],
  },

  {
    path: 'custom',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ':id',
      },
      {
        path: ':id',
        component: VideoPageComponent,
        providers: [{ provide: VIDEOS_SOURCE, useValue: 'customVideo$' }],
        canActivate: [doesCustomVideoExistGuard],
      },
    ],
  },
  {
    path: ':id',
    component: VideoPageComponent,
    providers: [{ provide: VIDEOS_SOURCE, useValue: 'video$' }],
    canActivate: [doesVideoExistGuard],
  },
]
