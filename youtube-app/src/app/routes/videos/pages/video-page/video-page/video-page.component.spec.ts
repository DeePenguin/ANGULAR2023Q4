import { Location } from '@angular/common'
import { Component, Input } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

import { VIDEOS_SOURCE } from '../../../tokens/videos-source.token'
import { VideosFacade } from '../../../videos-store/services/videos.facade'
import { VideoPageComponent } from './video-page.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

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

class VideosFacadeStub {
  public isLoading = of(false)
  public favorites$ = of([])
  public video$ = of({ videoItem: video })
}

@Component({
  selector: 'yt-video-details',
  template: ``,
})
class TestComponent {
  @Input() public video!: VideoItem
  @Input() public isFavorite!: Boolean
}

describe('VideoPageComponent', () => {
  let component: VideoPageComponent
  let fixture: ComponentFixture<VideoPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPageComponent, TestComponent],
      imports: [ButtonComponent],
      providers: [
        Location,
        { provide: ActivatedRoute, useValue: { data: of({ video }) } },
        { provide: VideosFacade, useClass: VideosFacadeStub },
        { provide: VIDEOS_SOURCE, useValue: 'video$' },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
