import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { SignInData } from '../models/sign-in-data.model'
import type { SignInResponse } from '../models/sign-in-response.model'
import type { SignUpData } from '../models/sign-up-data.model'

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHttpService {
  constructor(private http: HttpClient) {}

  public signUp(data: SignUpData): Observable<unknown> {
    return this.http.post('/registration', data)
  }

  public signIn(data: SignInData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/login', data)
  }

  public signOut(): Observable<unknown> {
    return this.http.delete('/logout')
  }
}
