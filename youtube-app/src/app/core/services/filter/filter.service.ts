import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterQuerySource$$ = new BehaviorSubject<string>('')
  private query?: string
  public filterQuery$ = this.filterQuerySource$$.asObservable()

  public changeQuery(newQuery: string): void {
    const query = newQuery.trim().toLowerCase()

    if (query === this.query) {
      return
    }

    this.query = query
    this.filterQuerySource$$.next(this.query)
  }
}
