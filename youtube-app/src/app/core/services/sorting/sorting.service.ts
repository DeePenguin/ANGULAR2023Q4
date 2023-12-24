import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import type { SortingCriteria } from '../../models/sorting-criteria.model'
import type { SortingOptions } from 'src/app/common/models/sorting-options.model'

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private sortingSettings$$ = new BehaviorSubject<null | SortingOptions<SortingCriteria[]>>(null)
  public sortingSettings$ = this.sortingSettings$$.asObservable()

  public changeSorting(settings: SortingOptions<SortingCriteria[]>): void {
    this.sortingSettings$$.next(settings)
  }
}
