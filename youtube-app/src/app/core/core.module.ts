import { isDevMode, NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { VideosStoreModule } from '../routes/videos/videos-store/videos-store.module'
import { HeaderComponent } from './components/header/header.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

@NgModule({
  imports: [
    HeaderComponent,
    NotFoundComponent,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    EffectsModule.forRoot([]),
    VideosStoreModule,
  ],
  exports: [HeaderComponent, NotFoundComponent],
})
export class CoreModule {}
