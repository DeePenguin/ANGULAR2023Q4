import { ChangeDetectionStrategy, Component, type OnDestroy, type OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { AuthFacade } from '../../auth-store/services/auth-facade.service'
import { emailValidator } from 'src/app/common/validators/email.validator'
import { hasNoSpaces } from 'src/app/common/validators/has-no-spaces.validator'
import { hasLowerCase } from 'src/app/common/validators/lowercase.validator'
import { nameValidator } from 'src/app/common/validators/name.validator'
import { hasNumbers } from 'src/app/common/validators/numbers.validator'
import { doesNotMatchRestrictedValues } from 'src/app/common/validators/restricted-values.validator'
import { hasSpecialCharacters } from 'src/app/common/validators/special-characters.validator'
import { hasUpperCase } from 'src/app/common/validators/uppercase.validator'

@Component({
  selector: 'cn-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  private subs = new Subscription()
  public isLoading$ = this.authFacade.isLoading$
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40), nameValidator]],
    email: [
      '',
      [Validators.required, emailValidator],
      [doesNotMatchRestrictedValues(this.authFacade.duplicatedEmails$, 'Email already in use')],
    ],
    password: [
      '',
      [
        Validators.required,
        hasNumbers,
        hasUpperCase,
        hasLowerCase,
        hasSpecialCharacters,
        hasNoSpaces,
        Validators.minLength(8),
      ],
    ],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.authFacade.duplicatedEmails$.subscribe(() => {
        this.form.controls.email.updateValueAndValidity()
      }),
    )
  }
  public submit(): void {
    if (this.form.invalid) {
      return
    }

    this.authFacade.signUp(this.form.getRawValue())
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
