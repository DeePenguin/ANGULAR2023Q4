import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

import { dateToColorMap } from '../common/constants/date-to-color-map.const'
import { DATE_TO_COLOR_MAP } from '../common/directives/border-color-by-date/tokens/date-to-color-map.token'
import { CoreModule } from '../core/core.module'
import { httpInterceptors } from '../core/interceptors/interceptors'
import { StorageModule } from '../core/storage/storage.module'
import { storageKeyPrefix } from '../core/storage/tokens/storage-key.token'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StorageModule.forRoot({ config: { prefix: storageKeyPrefix } }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    CoreModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(withInterceptors(httpInterceptors)),
    { provide: DATE_TO_COLOR_MAP, useValue: dateToColorMap },
  ],
})
export class AppModule {}
