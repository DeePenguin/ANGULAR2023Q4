import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'

import { VideoDetailsComponent } from './components/video-details/video-details.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { VideosListComponent } from './components/videos-list/videos-list.component'
import { VideoPageComponent } from './pages/video-page/video-page/video-page.component'
import { VideosPageComponent } from './pages/videos-page/videos-page.component'
import { VideosRoutingModule } from './videos-routing.module'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'

@NgModule({
  declarations: [
    VideosListComponent,
    VideoItemComponent,
    VideosPageComponent,
    VideoPageComponent,
    VideoDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ButtonComponent,
    NgOptimizedImage,
    VideoStatisticsComponent,
    BorderColorByDateDirective,
    VideosRoutingModule,
  ],
})
export class VideosModule {}
