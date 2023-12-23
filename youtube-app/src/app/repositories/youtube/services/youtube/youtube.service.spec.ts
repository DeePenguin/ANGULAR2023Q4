import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { YoutubeService } from './youtube.service'

const mockService = {
  getVideos: jest.fn().mockReturnValue(of([])),
}

describe('YoutubeService', () => {
  let service: YoutubeService

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: YoutubeService, useFactory: () => mockService }] })
    service = TestBed.inject(YoutubeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
