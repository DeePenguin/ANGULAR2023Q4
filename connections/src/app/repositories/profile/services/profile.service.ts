import { Injectable } from '@angular/core'
import { map, type Observable } from 'rxjs'

import { convertProfileApiToProfile } from '../helpers/convert-profile-api-to-profile.helper'
import type { Profile } from '../models/profile.model'
import { ProfileHttpService } from './profile-http.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private profileHttpService: ProfileHttpService) {}

  public getProfile(): Observable<Profile> {
    return this.profileHttpService.getProfile().pipe(map(convertProfileApiToProfile))
  }

  public changeName(name: string): Observable<unknown> {
    return this.profileHttpService.changeName(name)
  }
}
