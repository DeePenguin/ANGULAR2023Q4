import type { Routes } from '@angular/router'

import { isAuthorizedGuard } from './core/guards/is-authorized/is-authorized.guard'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
    data: { animateIndex: 0 },
  },
  {
    path: 'groups',
    title: 'Groups',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/groups/groups.module').then(m => m.GroupsModule),
    data: { animateIndex: 1 },
  },
  {
    path: 'conversations',
    title: 'Dialogs',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/conversations/conversations.module').then(m => m.ConversationsModule),
    data: { animateIndex: 2 },
  },
  {
    path: 'auth',
    title: 'Authorization',
    canMatch: [isAuthorizedGuard(false)],
    loadChildren: () => import('./routes/auth/auth.module').then(m => m.AuthModule),
    data: { animateIndex: 3 },
  },
  {
    path: 'profile',
    title: 'Profile',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/profile/profile.module').then(m => m.ProfileModule),
    data: { animateIndex: 4 },
  },
  {
    path: '**',
    loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Not found',
    data: { animateIndex: 5 },
  },
]
