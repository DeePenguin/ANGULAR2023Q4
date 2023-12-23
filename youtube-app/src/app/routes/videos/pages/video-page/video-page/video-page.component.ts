import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute, type Data } from '@angular/router'
import { filter, map, take } from 'rxjs'

import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPageComponent {
  public video$ = this.route.data.pipe(
    take(1),
    map<Data, unknown>(({ video }) => video),
    filter((video): video is VideoItem => Boolean(video)),
  )
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  public goBack(): void {
    this.location.back()
  }
}
