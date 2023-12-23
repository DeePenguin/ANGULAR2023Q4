import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { AuthRoutingModule } from './auth-routing.module'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, AuthRoutingModule],
})
export class AuthModule {}
