import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { LocalStorageService } from '../../storage/services/local-storage.service'
import { AuthorizationService } from './authorization.service'

const storageServiceMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

describe('AuthorizationService', () => {
  let service: AuthorizationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: LocalStorageService, useFactory: () => storageServiceMock }],
    })
    service = TestBed.inject(AuthorizationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
