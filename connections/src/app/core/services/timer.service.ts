import { Inject, Injectable } from '@angular/core'

import { Timer } from '../../common/tools/timer'
import { UPDATE_TIME } from 'src/app/core/tokens/update-time.token'

@Injectable()
export class TimerService {
  constructor(@Inject(UPDATE_TIME) private readonly duration: number) {}
  private timers = new Map<string, Timer>()

  public createTimer(key: string, duration: number = this.duration): Timer {
    if (this.timers.has(key)) {
      return this.timers.get(key)!
    }

    const newTimer = new Timer(duration)
    this.timers.set(key, newTimer)

    return newTimer
  }
}
