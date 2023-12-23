import type { AbstractControl, ValidationErrors } from '@angular/forms'

const nameRegExp = /^[A-Za-zА-Яа-я0-9 ]+$/
export const groupNameValidator = (control: AbstractControl<string>): ValidationErrors | null => {
  return nameRegExp.test(control.value) ? null : { error: 'Group name should contain only letters, numbers and spaces' }
}
