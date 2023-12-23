import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertUsersApiToUsers } from '../helpers/convert-users-api-to-users.helper'
import type { Users } from '../models/users.model'
import { UsersHttpService } from './users-http.service'

@Injectable()
export class UsersService {
  constructor(private usersHttpService: UsersHttpService) {}

  public getUsers(): Observable<Users> {
    return this.usersHttpService.getUsers().pipe(map(convertUsersApiToUsers))
  }
}
