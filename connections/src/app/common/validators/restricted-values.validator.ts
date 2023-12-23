import type { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { map, type Observable, take } from 'rxjs'

export const doesNotMatchRestrictedValues = <T extends unknown>(
  restrictedValues: Observable<T[]>,
  errorMessage: string,
): AsyncValidatorFn => {
  return (control: AbstractControl<T>): Observable<ValidationErrors | null> => {
    return restrictedValues.pipe(
      take(1),
      map(restricted => (restricted.includes(control.value) ? { error: errorMessage } : null)),
    )
  }
}
