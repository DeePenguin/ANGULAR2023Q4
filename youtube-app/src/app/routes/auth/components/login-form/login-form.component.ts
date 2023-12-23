import { ChangeDetectionStrategy, Component } from '@angular/core'
import { type FormControl, NonNullableFormBuilder, Validators } from '@angular/forms'

import { emailValidator } from 'src/app/common/validators/email.validator'
import { hasNoSpaces } from 'src/app/common/validators/has-no-spaces.validator'
import { passwordValidator } from 'src/app/common/validators/password.validator'
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service'

@Component({
  selector: 'yt-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public loginForm = this.fb.group({
    email: ['', emailValidator],
    password: ['', [Validators.required, Validators.minLength(8), hasNoSpaces, passwordValidator]],
  })
  public isPasswordHidden = true

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthorizationService,
  ) {}

  public get passwordControl(): FormControl<string> {
    return this.loginForm.controls.password
  }

  public get emailControl(): FormControl<string> {
    return this.loginForm.controls.email
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden
  }

  public submit(): void {
    this.authService.login(this.emailControl.value)
  }
}
