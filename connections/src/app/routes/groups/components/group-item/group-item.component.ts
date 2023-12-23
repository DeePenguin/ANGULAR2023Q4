import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

import { Group } from 'src/app/repositories/groups/models/group.model'

@Component({
  selector: 'cn-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupItemComponent {
  @Input() public group!: Group
  @Output() public remove = new EventEmitter<string>()
  @HostBinding('class.removable') public get isRemovable(): boolean {
    return this.group.isRemovable
  }

  public onRemove(): void {
    this.remove.emit(this.group.id)
  }
}
