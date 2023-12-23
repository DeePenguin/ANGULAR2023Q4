import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { LocalStorageService } from '../storage/services/local-storage.service'

@Injectable()
export class ThemeService {
  private readonly themeKey = '__theme'
  private initialValue = this.localStorageService.getItem<Boolean>(this.themeKey, false)
  private isDark$$ = new BehaviorSubject<Boolean>(this.initialValue)
  public isDark$ = this.isDark$$.asObservable()

  constructor(private localStorageService: LocalStorageService) {}

  public toggleTheme(): void {
    this.isDark$$.next(!this.isDark$$.value)
    this.localStorageService.setItem(this.themeKey, this.isDark$$.value)
  }
}
