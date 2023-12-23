import type { Routes } from '@angular/router'

import { NotFoundComponent } from '../core/components/not-found/not-found.component'
import { isAuthorizedGuard } from '../core/guards/is-authorized/is-authorized.guard'

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'videos',
    pathMatch: 'full',
  },
  {
    path: 'videos',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('../routes/videos/videos.module').then(m => m.VideosModule),
  },
  {
    path: 'auth',
    canMatch: [isAuthorizedGuard(false)],
    loadChildren: () => import('../routes/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('../routes/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
]
