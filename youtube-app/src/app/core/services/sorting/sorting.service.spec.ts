import { TestBed } from '@angular/core/testing'

import { SortingService } from './sorting.service'

describe('SortingService', () => {
  let service: SortingService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SortingService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
