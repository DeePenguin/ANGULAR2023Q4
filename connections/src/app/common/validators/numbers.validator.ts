import type { AbstractControl, ValidationErrors } from '@angular/forms'

const numbersRegExp = /[0-9]+/
export const hasNumbers = (control: AbstractControl<string>): ValidationErrors | null => {
  return numbersRegExp.test(control.value) ? null : { error: 'Must contain numbers' }
}
