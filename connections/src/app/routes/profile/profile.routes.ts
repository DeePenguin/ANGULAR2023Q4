import type { Routes } from '@angular/router'

import { ProfilePageComponent } from './pages/profile-page/profile-page.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfilePageComponent,
  },
]
