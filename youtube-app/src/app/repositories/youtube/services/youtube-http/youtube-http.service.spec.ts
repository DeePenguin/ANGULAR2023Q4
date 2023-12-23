import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { YoutubeHttpService } from './youtube-http.service'

describe('YoutubeHttpService', () => {
  let service: YoutubeHttpService

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    service = TestBed.inject(YoutubeHttpService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
