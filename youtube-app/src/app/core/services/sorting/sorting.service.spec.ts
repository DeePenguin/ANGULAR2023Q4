/* eslint-disable @typescript-eslint/dot-notation */
import { TestBed } from '@angular/core/testing'

import type { SortingCriteria } from '../../models/sorting-criteria.model'
import { SortingService } from './sorting.service'
import type { SortingOptions } from 'src/app/common/models/sorting-options.model'

describe('SortingService', () => {
  let service: SortingService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SortingService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('initial sorting should be null', () => {
    expect(service['sortingSettings$$'].value).toBe(null)
  })

  it('should change sorting', () => {
    const newValue: SortingOptions<SortingCriteria[]> = {
      criterion: 'views',
      direction: 1,
    }
    service.changeSorting(newValue)
    expect(service['sortingSettings$$'].value).toBe(newValue)
  })
})
