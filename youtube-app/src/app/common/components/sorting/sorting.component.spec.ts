import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'

import { SortingComponent } from './sorting.component'
import type { SortingCriteria } from 'src/app/core/models/sorting-criteria.model'

describe('SortingComponent', () => {
  let component: SortingComponent<SortingCriteria>
  let fixture: ComponentFixture<SortingComponent<SortingCriteria>>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingComponent, MatButtonToggleModule, MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(SortingComponent<SortingCriteria>)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
