import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailsComponent {
  @Input() public video: VideoItem | null = null

  public get description(): string[] {
    return this.video?.description.split(/(\n)/).filter(value => value.length) || []
  }
}
