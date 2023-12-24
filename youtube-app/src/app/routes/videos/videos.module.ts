import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RxFor } from '@rx-angular/template/for'
import { RxIf } from '@rx-angular/template/if'
import { LetDirective } from '@rx-angular/template/let'

import { VideoDetailsComponent } from './components/video-details/video-details.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { VideosListComponent } from './components/videos-list/videos-list.component'
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component'
import { VideoPageComponent } from './pages/video-page/video-page/video-page.component'
import { VideosPageComponent } from './pages/videos-page/videos-page.component'
import { VideosRoutingModule } from './videos-routing.module'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { FavoriteButtonComponent } from 'src/app/common/components/favorite-button/favorite-button.component'
import { VideoStatisticsComponent } from 'src/app/common/components/video-statistics/video-statistics.component'
import { BorderColorByDateDirective } from 'src/app/common/directives/border-color-by-date/border-color-by-date.directive'

@NgModule({
  declarations: [
    VideosListComponent,
    VideoItemComponent,
    VideosPageComponent,
    VideoPageComponent,
    VideoDetailsComponent,
    FavoritesPageComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    LetDirective,
    RxFor,
    RxIf,
    ButtonComponent,
    FavoriteButtonComponent,
    NgOptimizedImage,
    VideoStatisticsComponent,
    BorderColorByDateDirective,
    VideosRoutingModule,
  ],
})
export class VideosModule {}
