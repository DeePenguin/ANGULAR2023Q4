import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import type { ToggleFavEvent } from '../../models/toggle-fav-event.model'
import type { CustomVideoItem } from 'src/app/common/models/custom-video-item.model'
import type { VideoItem } from 'src/app/repositories/youtube/models/video/video-item.model'

@Component({
  selector: 'yt-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailsComponent {
  @Input() public video: VideoItem | CustomVideoItem | null = null
  @Input() public isFavorite = false
  @Output() public toggleFavorite = new EventEmitter<ToggleFavEvent>()
  @Output() public remove = new EventEmitter<string>()

  public isRemoveButtonDisabled = false

  public isCustom(video: VideoItem | CustomVideoItem): video is CustomVideoItem {
    return (video as CustomVideoItem).imageLink !== undefined
  }

  public get description(): string[] {
    return this.video?.description.split(/(\n)/).filter(value => value.length) || []
  }

  public onToggleFavorite(id: string): void {
    this.toggleFavorite.emit({ isFavorite: !this.isFavorite, id })
  }

  public onRemove(id: string): void {
    this.remove.emit(id)
    this.isRemoveButtonDisabled = true
  }
}
