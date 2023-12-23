import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosListComponent {
  @Input() public videos!: VideoItem[]

  public trackById(index: number, { id }: VideoItem): string {
    return id
  }
}
