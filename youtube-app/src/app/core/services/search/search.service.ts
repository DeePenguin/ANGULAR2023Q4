import { Injectable } from '@angular/core'
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery$$ = new BehaviorSubject<string>('')
  public searchQuery$ = this.searchQuery$$.pipe(
    debounceTime(600),
    distinctUntilChanged(),
    filter(value => value.length >= 3),
  )

  public changeQuery(newQuery: string): void {
    const query = newQuery.trim().toLowerCase()
    this.searchQuery$$.next(query)
  }
}
