import { CommonModule, NgOptimizedImage } from '@angular/common'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'

import { VideoItemComponent } from './video-item.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { FavoriteButtonComponent } from 'src/app/common/components/favorite-button/favorite-button.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
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
  },
  statistics: {
    viewCount: 1,
    likeCount: 1,
    favoriteCount: 1,
    commentCount: 1,
  },
}

const customVideo: CustomVideoItem = {
  id: '1700488411020',
  title: 'Pivo!',
  description: 'some description',
  imageLink: 'image-link',
  videoLink: 'video-link',
  publishedAt: '2023-11-20T13:52:28.096Z',
  tags: ['tag1'],
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
        FavoriteButtonComponent,
        NgOptimizedImage,
        VideoStatisticsComponent,
        BorderColorByDateDirective,
        RouterTestingModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoItemComponent)
    component = fixture.componentInstance
    component.video = video
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should create statistics for common video', () => {
    fixture.detectChanges()
    const statisticsElement = fixture.debugElement.query(By.css('.statistics'))
    expect(statisticsElement).toBeTruthy()
  })

  it('should not create statistics for custom video', () => {
    component.video = customVideo
    fixture.detectChanges()
    const statisticsElement = fixture.debugElement.query(By.css('.statistics'))
    expect(statisticsElement).toBeNull()
  })

  it('should render corresponding buttons for custom video', () => {
    component.video = customVideo
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css('.header__actions')).query(By.directive(ButtonComponent))
      .componentInstance as ButtonComponent
    const favoriteButton = fixture.debugElement.query(By.directive(FavoriteButtonComponent))
    expect(button.icon).toEqual('delete')
    expect(favoriteButton).toBeNull()
  })

  it('should render corresponding buttons for common video', () => {
    component.video = video
    fixture.detectChanges()
    const favoriteButton = fixture.debugElement.query(By.directive(FavoriteButtonComponent))
    expect(favoriteButton).toBeTruthy()
  })

  it('should emit toggleFavorite event', () => {
    component.video = video
    fixture.detectChanges()
    const toggleFavoriteSpy = jest.spyOn(component.toggleFavorite, 'emit')
    const favoriteButton = fixture.debugElement.query(By.directive(FavoriteButtonComponent))
    favoriteButton.triggerEventHandler('click')
    expect(toggleFavoriteSpy).toHaveBeenCalledWith({ isFavorite: !component.isFavorite, id: video.id })
  })

  it('should emit remove event', () => {
    component.video = customVideo
    fixture.detectChanges()
    const removeSpy = jest.spyOn(component.remove, 'emit')
    const removeButton = fixture.debugElement.query(By.directive(ButtonComponent))
    removeButton.triggerEventHandler('click')
    expect(removeSpy).toHaveBeenCalledWith(customVideo.id)
  })
})
