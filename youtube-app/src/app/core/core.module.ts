import { NgModule } from '@angular/core'

import { HeaderComponent } from './components/header/header.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

@NgModule({
  imports: [HeaderComponent, NotFoundComponent],
  exports: [HeaderComponent, NotFoundComponent],
})
export class CoreModule {}
