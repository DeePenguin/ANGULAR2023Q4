import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import type { SignInData } from '../models/sign-in-data.model'
import type { SignUpData } from '../models/sign-up-data.model'
import type { UserCredentials } from '../models/user-credentials.model'
import { AuthorizationHttpService } from './authorization-http.service'

@Injectable()
export class AuthorizationService {
  constructor(private authHttpService: AuthorizationHttpService) {}

  public signUp(data: SignUpData): Observable<unknown> {
    return this.authHttpService.signUp(data)
  }

  public signIn(signInData: SignInData): Observable<UserCredentials> {
    return this.authHttpService
      .signIn(signInData)
      .pipe(map(({ token, uid }) => ({ token, uid, email: signInData.email })))
  }

  public signOut(): Observable<unknown> {
    return this.authHttpService.signOut()
  }
}
