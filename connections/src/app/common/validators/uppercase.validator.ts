import type { AbstractControl, ValidationErrors } from '@angular/forms'

const upperCaseRegExp = /[A-Z]+/

export const hasUpperCase = (control: AbstractControl<string>): ValidationErrors | null => {
  return upperCaseRegExp.test(control.value) ? null : { error: 'Must contain uppercase letters' }
}
