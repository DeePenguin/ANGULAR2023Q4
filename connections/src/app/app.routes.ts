import type { Routes } from '@angular/router'

import { isAuthorizedGuard } from './core/guards/is-authorized/is-authorized.guard'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'groups',
    title: 'Groups',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/groups/groups.module').then(m => m.GroupsModule),
  },
  {
    path: 'conversations',
    title: 'Dialogs',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/conversations/conversations.module').then(m => m.ConversationsModule),
  },
  {
    path: 'auth',
    title: 'Authorization',
    canMatch: [isAuthorizedGuard(false)],
    loadChildren: () => import('./routes/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'profile',
    title: 'Profile',
    canMatch: [isAuthorizedGuard(true)],
    loadChildren: () => import('./routes/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: '**',
    loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Not found',
  },
]
