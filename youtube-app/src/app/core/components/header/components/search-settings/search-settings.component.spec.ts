import { Component, Input } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { SearchSettingsComponent } from './search-settings.component'
import type { SortingCriteria } from 'src/app/core/models/sorting-criteria.model'
import { FilterService } from 'src/app/core/services/filter/filter.service'
import { SortingService } from 'src/app/core/services/sorting/sorting.service'

class SortingServiceStub {
  public changeSorting(): void {
    jest.fn()
  }
}
class FilterServiceStub {
  public changeQuery(): void {
    jest.fn()
  }
}
@Component({
  selector: 'yt-sorting',
  template: ``,
})
class SortingComponent {
  @Input() public criteria: SortingCriteria[] = []
}

@Component({
  selector: 'yt-filter',
  template: ``,
})
class FilterComponent {}

describe('SearchSettingsComponent', () => {
  let component: SearchSettingsComponent
  let fixture: ComponentFixture<SearchSettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingComponent, FilterComponent],
      imports: [SearchSettingsComponent, NoopAnimationsModule],
      providers: [
        { provide: SortingService, useClass: SortingServiceStub },
        { provide: FilterService, useClass: FilterServiceStub },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
