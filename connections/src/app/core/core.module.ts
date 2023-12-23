import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common'
import { isDevMode, NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TuiAlertModule } from '@taiga-ui/core'
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit'

import { AuthStoreModule } from '../routes/auth/auth-store/auth-store.module'
import { ConversationsStoreModule } from '../routes/conversations/conversations-store/conversations-store.module'
import { GroupsStoreModule } from '../routes/groups/groups-store/groups-store.module'
import { ProfileStoreModule } from '../routes/profile/profile-store/profile-store.module'
import { HeaderComponent } from './components/header/header.component'
import { validationErrors } from './forms/validation-errors'
import { AlertService } from './services/alert.service'
import { ThemeService } from './services/theme.service'
import { TimerService } from './services/timer.service'
import { StorageModule } from './storage/storage.module'
import { storageKeyPrefix } from './storage/tokens/storage-key.token'
import { UsersStoreModule } from './store/users-store/users-store.module'
import { defaultUpdateTime } from './tokens/default-update-time.token'
import { UPDATE_TIME } from './tokens/update-time.token'

@NgModule({
  declarations: [],
  imports: [
    StorageModule.forRoot({ config: { prefix: storageKeyPrefix } }),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    AuthStoreModule,
    ProfileStoreModule,
    GroupsStoreModule,
    UsersStoreModule,
    ConversationsStoreModule,
    TuiAlertModule,
    HeaderComponent,
  ],
  exports: [HeaderComponent],
  providers: [
    AlertService,
    ThemeService,
    TimerService,
    { provide: TUI_VALIDATION_ERRORS, useValue: validationErrors },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd MMM yyyy, HH:mm' } },
    { provide: UPDATE_TIME, useValue: defaultUpdateTime },
  ],
})
export class CoreModule {}
