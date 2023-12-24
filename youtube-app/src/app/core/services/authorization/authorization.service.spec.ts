/* eslint-disable @typescript-eslint/dot-notation */
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { LocalStorageService } from '../../storage/services/local-storage.service'
import { AuthorizationService } from './authorization.service'

let storage: Record<string, unknown> = {}

const storageServiceMock = {
  getItem: jest.fn((key: string) => storage[key] || null),
  setItem: jest.fn((key: string, value: unknown) => {
    storage[key] = value
  }),
  removeItem: jest.fn((key: string) => {
    storage[key] = null
  }),
}

const userInfo = {
  name: 'test',
}

describe('AuthorizationService', () => {
  let service: AuthorizationService

  beforeEach(() => {
    storage = {}
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'auth', redirectTo: '' }])],
      providers: [{ provide: LocalStorageService, useFactory: () => storageServiceMock }],
    })
    service = TestBed.inject(AuthorizationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('initial user info should be null by default', () => {
    expect(service['userInfo$$'].value).toBeNull()
  })

  it('login should set user info', () => {
    service.login('test@test.test')
    expect(service['userInfo$$'].value).toEqual(userInfo)
  })

  it('login should call storageService', () => {
    const storageSpy = jest.spyOn(storageServiceMock, 'setItem')
    service.login('test@test.test')
    expect(storageSpy).toBeCalled()
    expect(storageSpy).toHaveBeenCalledWith('fakeAuth', userInfo)
  })

  it('logout should clear user info', () => {
    service.login('test@test.test')
    service.logout()
    expect(service['userInfo$$'].value).toBeNull()
  })

  it('logout should call storageService', () => {
    const storageSpy = jest.spyOn(storageServiceMock, 'setItem')
    service.login('test@test.test')
    service.logout()
    expect(storageSpy).toBeCalled()
  })
})
