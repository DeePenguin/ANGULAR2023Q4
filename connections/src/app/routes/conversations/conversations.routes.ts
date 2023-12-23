import type { Routes } from '@angular/router'

import { DialogPageComponent } from './pages/dialog-page/dialog-page.component'

export const routes: Routes = [
  {
    path: ':dialogId',
    component: DialogPageComponent,
  },
]
