import { NgOptimizedImage } from '@angular/common'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'

import { VideoDetailsComponent } from './video-details.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

const video: VideoItem = {
  id: 'id',
  title: 'title',
  publishedAt: '2023-10-30T16:48:15.000Z',
  description: 'description',
  channelTitle: 'channelTitle',
  tags: ['tags'],
  thumbnails: {
    medium: {
      url: 'url',
      width: 100,
      height: 100,
    },
    high: {
      url: 'url',
      width: 100,
      height: 100,
    },
    standard: {
      url: 'url',
      width: 100,
      height: 100,
    },
    maxres: {
      url: 'url',
      width: 100,
      height: 100,
    },
    default: {
      url: 'url',
      width: 100,
      height: 100,
    },
  },
  statistics: {
    viewCount: 1,
    likeCount: 1,
    favoriteCount: 1,
    commentCount: 1,
  },
}

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent
  let fixture: ComponentFixture<VideoDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDetailsComponent],
      imports: [VideoStatisticsComponent, BorderColorByDateDirective, MatCardModule, NgOptimizedImage],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoDetailsComponent)
    component = fixture.componentInstance
    component.video = video
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
