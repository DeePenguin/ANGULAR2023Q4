import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core'
import { map, type Observable } from 'rxjs'

import type { ToggleFavEvent } from '../../models/toggle-fav-event.model'
import { VideosService } from '../../services/videos/videos.service'
import { VideosFacade } from '../../videos-store/services/videos.facade'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosListComponent implements OnInit {
  @Input() public videosSource: Observable<Array<VideoItem | CustomVideoItem>> | null = null
  public videos$!: Observable<Array<VideoItem | CustomVideoItem>>
  public isLoading$ = this.videosFacade.isLoading$

  constructor(
    private videosService: VideosService,
    private videosFacade: VideosFacade,
  ) {}

  public ngOnInit(): void {
    this.videos$ = this.videosSource ? this.videosSource : this.videosService.videos$
  }

  public isFavorite = (id: string): Observable<boolean> => {
    return this.videosFacade.favorites$.pipe(map(favorites => favorites.includes(id)))
  }

  public toggleFavorite(options: ToggleFavEvent): void {
    this.videosFacade.toggleFavorite(options)
  }

  public remove(id: string): void {
    this.videosFacade.removeCustomVideo(id)
  }
}
