import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function hasNoSpaces(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.includes(' ') ? { error: "This field can't contain spaces" } : null
}
