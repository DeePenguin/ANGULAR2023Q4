/* eslint-disable @typescript-eslint/dot-notation */
import { TestBed } from '@angular/core/testing'

import { FilterService } from './filter.service'

describe('FilterService', () => {
  let service: FilterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FilterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('initial query should be empty', () => {
    expect(service['filterQuery$$'].value).toBe('')
  })

  it('should change query', () => {
    service.changeQuery('test')
    expect(service['filterQuery$$'].value).toBe('test')
  })

  it('should trim and lowercase query', () => {
    service.changeQuery('   _TEsT_    ')
    expect(service['filterQuery$$'].value).toBe('_test_')
  })
})
