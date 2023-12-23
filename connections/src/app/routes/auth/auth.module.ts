import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LetModule } from '@ngrx/component'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit'

import { AuthRoutingModule } from './auth-routing.module'
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component'
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component'
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component'
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component'

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent, SignUpFormComponent, SignInFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiIslandModule,
    TuiLoaderModule,
    LetModule,
  ],
})
export class AuthModule {}
