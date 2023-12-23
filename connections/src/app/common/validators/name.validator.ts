import type { AbstractControl, ValidationErrors } from '@angular/forms'

const nameRegExp = /^[A-Za-zА-Яа-я ]+$/
export const nameValidator = (control: AbstractControl<string>): ValidationErrors | null => {
  return nameRegExp.test(control.value) ? null : { error: 'Name should contain only letters and spaces' }
}
