import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function hasNoSpaces(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.includes(' ') ? { noSpaces: "This field can't contain spaces" } : null
}
