import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

import type { UserInfo } from '../../models/user-info.model'
import { LocalStorageService } from '../../storage/services/local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private storageKey = 'fakeAuth'
  private initialUserInfo = this.localStorageService.getItem<UserInfo>(this.storageKey)
  private userInfoSource$$ = new BehaviorSubject<UserInfo | null>(this.initialUserInfo)
  public userInfo$ = this.userInfoSource$$.asObservable()

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  public login(email: string): void {
    const userInfo = { name: email.split('@')[0] }
    this.localStorageService.setItem(this.storageKey, userInfo)
    this.userInfoSource$$.next(userInfo)
    this.router.navigate(['/'], { replaceUrl: true }).catch(console.error)
  }

  public logout(): void {
    this.localStorageService.removeItem(this.storageKey)
    this.userInfoSource$$.next(null)
    this.router.navigate(['/auth']).catch(console.error)
  }
}
