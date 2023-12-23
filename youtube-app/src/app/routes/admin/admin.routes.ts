import type { Routes } from '@angular/router'

import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'add-item',
      },
      {
        path: 'add-item',
        component: AddItemPageComponent,
      },
    ],
  },
]
