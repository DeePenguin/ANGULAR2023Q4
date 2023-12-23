import type { Routes } from '@angular/router'

import { GroupDialogPageComponent } from './pages/group-dialog-page/group-dialog-page.component'

export const routes: Routes = [
  {
    path: ':groupId',
    component: GroupDialogPageComponent,
  },
]
