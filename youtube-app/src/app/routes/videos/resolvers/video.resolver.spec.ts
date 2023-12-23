import { TestBed } from '@angular/core/testing'
import type { ResolveFn } from '@angular/router'

import { videoResolver } from './video.resolver'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

describe('videoResolver', () => {
  const executeResolver: ResolveFn<VideoItem> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => videoResolver(...resolverParameters))

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(executeResolver).toBeTruthy()
  })
})
