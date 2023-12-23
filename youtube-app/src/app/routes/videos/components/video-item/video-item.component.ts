import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() public video!: VideoItem
}
