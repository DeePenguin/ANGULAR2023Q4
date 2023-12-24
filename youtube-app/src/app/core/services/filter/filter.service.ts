import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterQuery$$ = new BehaviorSubject<string>('')
  private query?: string
  public filterQuery$ = this.filterQuery$$.asObservable()

  public changeQuery(newQuery: string): void {
    const query = newQuery.trim().toLowerCase()

    if (query === this.query) {
      return
    }

    this.query = query
    this.filterQuery$$.next(this.query)
  }
}
