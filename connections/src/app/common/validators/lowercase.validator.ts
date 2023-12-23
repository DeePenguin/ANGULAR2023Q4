import type { AbstractControl, ValidationErrors } from '@angular/forms'

const upperCaseRegExp = /[a-z]+/

export const hasLowerCase = (control: AbstractControl<string>): ValidationErrors | null => {
  return upperCaseRegExp.test(control.value) ? null : { error: 'Must contain lowercase letters' }
}
