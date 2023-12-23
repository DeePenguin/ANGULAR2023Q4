import { BehaviorSubject, map, take, tap, timer } from 'rxjs'

export class Timer {
  private subject$$ = new BehaviorSubject<number>(0)
  private isRunning = false
  public timer$ = this.subject$$.asObservable()

  constructor(private readonly duration: number) {}

  public start(): void {
    if (this.isRunning) {
      return
    }

    this.isRunning = true
    const currentTimer = timer(0, 1000)
      .pipe(
        take(this.duration + 1),
        map(seconds => (this.duration - seconds) * 1000),
        tap(countdownValue => {
          this.subject$$.next(countdownValue)
        }),
      )
      .subscribe({
        complete: () => {
          currentTimer.unsubscribe()
          this.isRunning = false
        },
      })
  }
}
