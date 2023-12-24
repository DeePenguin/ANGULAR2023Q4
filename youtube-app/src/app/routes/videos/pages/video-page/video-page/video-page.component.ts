import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { combineLatestWith, filter, map, type Observable, take } from 'rxjs'

import type { ToggleFavEvent } from '../../../models/toggle-fav-event.model'
import { VIDEOS_SOURCE } from '../../../tokens/videos-source.token'
import type { VideoState } from '../../../videos-store/models/video-state.model'
import { VideosSources } from '../../../videos-store/models/videos-sources.model'
import { VideosFacade } from '../../../videos-store/services/videos.facade'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPageComponent {
  private videosFromSource$ = this.videosFacade[this.videosSource] as Observable<unknown>

  public video$ = this.videosFromSource$.pipe(
    filter((source): source is VideoState<CustomVideoItem | VideoItem> => this.isVideoState(source)),
    take(1),
    map(source => source.videoItem),
    filter((video): video is VideoItem | CustomVideoItem => Boolean(video)),
  )

  public isFavorite$ = this.videosFacade.favorites$.pipe(
    combineLatestWith(this.video$),
    map(([favorites, video]) => favorites.includes(video.id)),
  )

  constructor(
    private location: Location,
    private videosFacade: VideosFacade,
    @Inject(VIDEOS_SOURCE) private videosSource: VideosSources,
  ) {}

  public goBack(): void {
    this.location.back()
  }

  public toggleFavorite(options: ToggleFavEvent): void {
    this.videosFacade.toggleFavorite(options)
  }

  public remove(id: string): void {
    this.videosFacade.removeCustomVideo(id)
  }

  private isVideoState(source: unknown): source is VideoState<CustomVideoItem | VideoItem> {
    return (source as VideoState<CustomVideoItem | VideoItem>).videoItem !== undefined
  }
}
