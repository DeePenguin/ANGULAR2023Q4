import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LetModule } from '@ngrx/component'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import { TuiFieldErrorPipeModule, TuiInputModule, TuiIslandModule } from '@taiga-ui/kit'
import { TuiBlockStatusModule } from '@taiga-ui/layout'

import { ProfileComponent } from './components/profile/profile.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { ProfileRoutingModule } from './profile-routing.module'

@NgModule({
  declarations: [ProfilePageComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    LetModule,
    TuiIslandModule,
    TuiLoaderModule,
    TuiBlockStatusModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiHintModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
})
export class ProfileModule {}
