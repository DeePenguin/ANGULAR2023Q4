import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import type { Group } from 'src/app/repositories/groups/models/group.model'

@Component({
  selector: 'cn-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsListComponent {
  @Input() public groups: Group[] = []
  @Output() public remove = new EventEmitter<string>()

  public trackById(_: number, { id }: { id: string }): string {
    return id
  }

  public onRemove(id: string): void {
    this.remove.emit(id)
  }
}
