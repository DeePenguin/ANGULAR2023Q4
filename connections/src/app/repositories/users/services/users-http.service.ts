import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { UsersApi } from '../models/users-api.model'

@Injectable()
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UsersApi> {
    return this.http.get<UsersApi>('/users')
  }
}
