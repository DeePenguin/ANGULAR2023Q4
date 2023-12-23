import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FilterComponent } from '../filter/filter.component'
import { SortingComponent } from 'src/app/common/components/sorting/sorting.component'
import type { SortingOptions } from 'src/app/common/models/sorting-options.model'
import type { SortingCriteria } from 'src/app/core/models/sorting-criteria.model'
import { FilterService } from 'src/app/core/services/filter/filter.service'
import { SortingService } from 'src/app/core/services/sorting/sorting.service'

@Component({
  selector: 'yt-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss'],
  standalone: true,
  imports: [SortingComponent, FilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSettingsComponent {
  public sortingCriteria: SortingCriteria[] = ['date', 'views']

  constructor(
    private sortingService: SortingService,
    private filterService: FilterService,
  ) {}

  public onSortChange(sortingOptions: SortingOptions<SortingCriteria[]>): void {
    this.sortingService.changeSorting(sortingOptions)
  }

  public onFilterChange(value: string): void {
    this.filterService.changeQuery(value)
  }
}
