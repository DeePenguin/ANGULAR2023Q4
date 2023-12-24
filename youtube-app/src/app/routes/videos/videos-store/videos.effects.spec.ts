import { TestBed, waitForAsync } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import type { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { take } from 'rxjs/operators'

import { videosApiActions } from './actions/videos-api.actions'
import { videosActions } from './actions/videos.actions'
import { VideosEffects } from './videos.effects'
import { customVideosMock, getVideoByIdMock, getVideosMock, videosMock } from './videos.mocks'
import { selectCustomVideos } from './videos.selectors'
import { YoutubeService } from 'src/app/repositories/youtube/services/youtube/youtube.service'

const youtubeServiceMock = {
  getVideos: jest.fn(() => of(getVideosMock)),
  getVideoById: jest.fn(() => of(getVideoByIdMock)),
  getVideosByIds: jest.fn(() => of(videosMock)),
}

describe('VideosEffects', () => {
  let effects: VideosEffects
  let actions$ = new Observable<Action>()
  let youtubeService: YoutubeService
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        VideosEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectCustomVideos,
              value: customVideosMock,
            },
          ],
        }),
        {
          provide: YoutubeService,
          useFactory: () => youtubeServiceMock,
        },
      ],
    })

    effects = TestBed.inject(VideosEffects)
    youtubeService = TestBed.inject(YoutubeService)
  }))

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })

  it('should get videos', () => {
    const serviceSpy = jest.spyOn(youtubeService, 'getVideos')
    actions$ = of(videosActions.getVideos({ searchQuery: 'test' }))

    effects.getVideos$.pipe(take(1)).subscribe(action => {
      expect(action).toEqual(videosApiActions.loadVideosSuccess({ videos: getVideosMock }))
    })
    expect(serviceSpy).toHaveBeenCalled()
    expect(serviceSpy).toHaveBeenCalledWith({ searchQuery: 'test' })
  })

  it('should get video by id', () => {
    const serviceSpy = jest.spyOn(youtubeService, 'getVideoById')
    actions$ = of(videosActions.getVideoById({ id: 'testId' }))

    effects.getVideoById$.pipe(take(1)).subscribe(action => {
      expect(action).toEqual(videosApiActions.loadVideoByIdSuccess({ video: getVideoByIdMock }))
    })
    expect(serviceSpy).toHaveBeenCalled()
    expect(serviceSpy).toHaveBeenCalledWith('testId')
  })

  it('should get favorite videos', () => {
    const serviceSpy = jest.spyOn(youtubeService, 'getVideosByIds')
    actions$ = of(videosActions.getFavorites({ ids: ['testId'] }))

    effects.getFavoriteVideos$.pipe(take(1)).subscribe(action => {
      expect(action).toEqual(videosApiActions.loadFavoriteVideosSuccess({ videos: videosMock }))
    })
    expect(serviceSpy).toHaveBeenCalled()
    expect(serviceSpy).toHaveBeenCalledWith(['testId'])
  })

  it('should get existing custom video from store', () => {
    const { id } = customVideosMock[0]
    actions$ = of(videosActions.getCustomVideo({ id }))

    effects.getCustomVideo$.pipe(take(1)).subscribe(action => {
      expect(action).toEqual(videosActions.setCustomVideo({ video: customVideosMock[0] }))
    })
  })

  it('should set error if custom video not found', () => {
    actions$ = of(videosActions.getCustomVideo({ id: 'invalid' }))

    effects.getCustomVideo$.pipe(take(1)).subscribe(action => {
      expect(action).toEqual(videosActions.setCustomVideoError({ error: 'Video not found' }))
    })
  })
})
