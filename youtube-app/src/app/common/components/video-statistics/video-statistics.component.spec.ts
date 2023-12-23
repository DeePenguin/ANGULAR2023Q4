import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { VideoStatisticsComponent } from './video-statistics.component'
import type { VideoStatistics } from 'src/app/repositories/youtube/models/video/video-statistics.model'

const statistics: VideoStatistics = {
  viewCount: 100,
  likeCount: 200,
  commentCount: 400,
  favoriteCount: 500,
}

describe('VideoStatisticsComponent', () => {
  let component: VideoStatisticsComponent
  let fixture: ComponentFixture<VideoStatisticsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStatisticsComponent, MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoStatisticsComponent)
    component = fixture.componentInstance
    component.statistics = statistics
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
