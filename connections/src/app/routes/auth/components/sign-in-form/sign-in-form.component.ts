import { ChangeDetectionStrategy, Component, type OnDestroy, type OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { AuthFacade } from '../../auth-store/services/auth-facade.service'
import { emailValidator } from 'src/app/common/validators/email.validator'

@Component({
  selector: 'cn-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit, OnDestroy {
  public isLoading$ = this.authFacade.isLoading$
  public error$ = this.authFacade.error$
  public subs = new Subscription()
  public form = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.error$.subscribe(error => {
        if (error?.type === 'NotFoundException') {
          this.form.setErrors({ error: 'Email or password is incorrect' })
        }
      }),
    )
  }

  public submit(): void {
    if (this.form.invalid) {
      return
    }

    this.authFacade.signIn(this.form.getRawValue())
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
