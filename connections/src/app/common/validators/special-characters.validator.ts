import type { AbstractControl, ValidationErrors } from '@angular/forms'

const specialCharactersRegExp = /[!"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~]+/
export const hasSpecialCharacters = (control: AbstractControl<string>): ValidationErrors | null => {
  return specialCharactersRegExp.test(control.value) ? null : { error: 'Must contain special characters' }
}
