import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TuiDialogModule, TuiModeModule, TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { httpInterceptors } from './core/interceptors/interceptors'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    TuiRootModule,
    TuiDialogModule,
    TuiModeModule,
    TuiThemeNightModule,
  ],
  providers: [provideHttpClient(withInterceptors(httpInterceptors))],
  bootstrap: [AppComponent],
})
export class AppModule {}
