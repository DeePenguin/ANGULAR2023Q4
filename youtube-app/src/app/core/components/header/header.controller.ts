import { Injectable } from '@angular/core'
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs'

import { VideosFacade } from 'src/app/routes/videos/videos-store/services/videos.facade'

@Injectable()
export class HeaderControllerService {
  private searchQuery$$ = new BehaviorSubject<string>('')
  private subs = new Subscription()
  public searchQuery$ = this.searchQuery$$.pipe(
    debounceTime(600),
    distinctUntilChanged(),
    filter(value => value.length >= 3),
  )

  constructor(private videosFacade: VideosFacade) {}

  public init(): void {
    this.subs.add(
      this.searchQuery$$
        .pipe(
          debounceTime(600),
          distinctUntilChanged(),
          filter(value => value.length >= 3),
        )
        .subscribe(searchQuery => {
          this.videosFacade.changeSearchQuery(searchQuery)
        }),
    )
  }

  public changeSearchQuery(newQuery: string): void {
    const query = newQuery.trim().toLowerCase()
    this.searchQuery$$.next(query)
  }

  public destroy(): void {
    this.subs.unsubscribe()
  }
}
