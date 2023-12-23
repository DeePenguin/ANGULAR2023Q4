import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'

import type { SortingOptions } from '../../models/sorting-options.model'

@Component({
  selector: 'yt-sorting',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent<T extends string> {
  @Input() public criteria: T[] = []
  @Output() public sortChange = new EventEmitter<SortingOptions<typeof this.criteria>>()

  public direction: -1 | 1 = 1
  private criterion: T | null = null

  public onClick(criterion: T): void {
    this.criteria && this.criterion === criterion ? this.changeDirection() : this.changeCriteria(criterion)
  }

  public changeDirection(): void {
    this.direction *= -1
    this.emitSort()
  }

  private emitSort(): void {
    this.sortChange.emit({
      direction: this.direction,
      criterion: this.criterion!,
    })
  }

  public changeCriteria(criterion: T): void {
    this.criterion = criterion
    this.direction = 1
    this.emitSort()
  }

  public get icon(): string {
    return this.direction === 1 ? 'arrow_upward_alt' : 'arrow_downward_alt'
  }

  public trackCriteria(index: number): number {
    return index
  }
}
