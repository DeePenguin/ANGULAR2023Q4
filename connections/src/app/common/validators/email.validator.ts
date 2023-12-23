import type { AbstractControl, ValidationErrors } from '@angular/forms'

const emailRegExp = new RegExp(
  '^(?:[a-z0-9_-]+\\.)*[a-z0-9_-]+@(?:[a-z0-9]+(?:[-.](?:[a-z0-9])+)*\\.)+[a-z]{2,6}$',
  'i',
)
export const emailValidator = (control: AbstractControl<string>): ValidationErrors | null => {
  return emailRegExp.test(control.value) ? null : { error: 'Email should match the following format: name@domain.com' }
}
