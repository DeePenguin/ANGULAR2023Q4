import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

import { VideoStatistics } from 'src/app/repositories/youtube/models/video/video-statistics.model'

@Component({
  selector: 'yt-video-statistics',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './video-statistics.component.html',
  styleUrls: ['./video-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoStatisticsComponent {
  @Input() public statistics!: VideoStatistics

  public items: Array<{ icon: string; key: keyof VideoStatistics }> = [
    { icon: 'visibility', key: 'viewCount' },
    { icon: 'thumb_up', key: 'likeCount' },
    { icon: 'forum', key: 'commentCount' },
  ]

  public trackByKey(index: number, { key }: { key: string }): string {
    return key
  }
}
