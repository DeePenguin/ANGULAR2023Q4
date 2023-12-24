import { videosApiActions } from './actions/videos-api.actions'
import { videosActions } from './actions/videos.actions'
import type { VideosState } from './models/videos-state.model'
import { getVideosMock } from './videos.mocks'
import { videosInitialState, videosReducer } from './videos.reducers'

describe('VideosReducers', () => {
  let initialState: VideosState

  beforeEach(() => {
    initialState = videosInitialState
  })

  it('should return the default state', () => {
    const action = {
      type: 'Unknown',
    }
    const state = videosReducer(initialState, action)
    expect(state).toBe(initialState)
  })

  it('should change state when getVideos', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
    }
    const state = videosReducer(initialState, videosActions.getVideos)

    expect(state).toEqual(expectedState)
  })

  it('should change state when getVideosSuccess', () => {
    const expectedState = {
      ...initialState,
      videos: getVideosMock.items,
      pagination: { ...initialState.pagination, ...getVideosMock.pagination },
    }
    const action = videosApiActions.loadVideosSuccess({ videos: getVideosMock })
    const state = videosReducer(initialState, action)

    expect(state).toEqual(expectedState)
    expect(state).not.toBe(initialState)
  })

  it('should change state when getVideosFailure', () => {
    const error = 'error'
    const expectedState = {
      ...initialState,
      error,
    }
    const action = videosApiActions.loadVideosFailure({ error })
    const state = videosReducer(initialState, action)

    expect(state).toEqual(expectedState)
    expect(state).not.toBe(initialState)
  })
})
