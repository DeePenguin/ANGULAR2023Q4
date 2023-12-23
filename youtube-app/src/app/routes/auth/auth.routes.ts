import type { Routes } from '@angular/router'

import { LoginPageComponent } from './pages/login-page/login-page.component'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
]
