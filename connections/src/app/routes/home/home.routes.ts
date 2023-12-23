import type { Routes } from '@angular/router'

import { HomePageComponent } from './pages/home-page/home-page.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
]
