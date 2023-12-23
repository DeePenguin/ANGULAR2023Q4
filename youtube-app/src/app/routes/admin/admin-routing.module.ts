import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './admin.routes'

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
