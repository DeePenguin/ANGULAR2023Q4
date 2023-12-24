import { CommonModule, NgOptimizedImage } from '@angular/common'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { RxIf } from '@rx-angular/template/if'
import { of } from 'rxjs'

import { VideosService } from '../../services/videos/videos.service'
import { VideosFacade } from '../../videos-store/services/videos.facade'
import { VideoItemComponent } from '../video-item/video-item.component'
import { VideosListComponent } from './videos-list.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'

class VideosFacadeMock {
  public isLoading = of(false)
}

class VideosServiceMock {
  public videos$ = of([])
}

describe('VideoListComponent', () => {
  let component: VideosListComponent
  let fixture: ComponentFixture<VideosListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideosListComponent, VideoItemComponent],
      imports: [
        CommonModule,
        MatCardModule,
        ButtonComponent,
        NgOptimizedImage,
        VideoStatisticsComponent,
        BorderColorByDateDirective,
        RxIf,
      ],
      providers: [
        { provide: VideosFacade, useClass: VideosFacadeMock },
        { provide: VideosService, useClass: VideosServiceMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(VideosListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
