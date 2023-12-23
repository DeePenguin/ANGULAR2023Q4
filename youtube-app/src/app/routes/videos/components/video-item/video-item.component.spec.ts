import { CommonModule, NgOptimizedImage } from '@angular/common'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { RouterTestingModule } from '@angular/router/testing'

import { VideoItemComponent } from './video-item.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

const video: VideoItem = {
  id: 'id',
  title: 'title',
  publishedAt: 'publishedAt',
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

describe('VideoItemComponent', () => {
  let component: VideoItemComponent
  let fixture: ComponentFixture<VideoItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoItemComponent],
      imports: [
        CommonModule,
        MatCardModule,
        ButtonComponent,
        NgOptimizedImage,
        VideoStatisticsComponent,
        BorderColorByDateDirective,
        RouterTestingModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoItemComponent)
    component = fixture.componentInstance
    component.video = video
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
