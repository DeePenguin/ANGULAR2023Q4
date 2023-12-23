import type { AbstractControl, ValidationErrors } from '@angular/forms'

export const dateValidator = (control: AbstractControl<Date | null>): ValidationErrors | null => {
  if (!control.value?.getTime) {
    return { date: 'The date is invalid' }
  }

  return Date.now() - Number(control.value) > 0 ? null : { date: 'The date is invalid' }
}
