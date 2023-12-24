import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { ProfileApi } from '../models/profile-api.model'

@Injectable()
export class ProfileHttpService {
  constructor(private http: HttpClient) {}

  public getProfile(): Observable<ProfileApi> {
    return this.http.get<ProfileApi>('/profile')
  }

  public changeName(name: string): Observable<unknown> {
    return this.http.put<unknown>('/profile', { name })
  }
}
