import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import type { ToggleFavEvent } from '../../models/toggle-fav-event.model'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() public video!: VideoItem | CustomVideoItem
  @Input() public isFavorite = false
  @Output() public toggleFavorite = new EventEmitter<ToggleFavEvent>()
  @Output() public remove = new EventEmitter<string>()

  public isCustom(video: VideoItem | CustomVideoItem): video is CustomVideoItem {
    return (video as CustomVideoItem).imageLink !== undefined
  }

  public onToggleFavorite(id: string): void {
    this.toggleFavorite.emit({ isFavorite: !this.isFavorite, id })
  }

  public onRemove(id: string): void {
    this.remove.emit(id)
  }
}
