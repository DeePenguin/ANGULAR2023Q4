import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { AddItemPageComponent } from './add-item-page.component'

@Component({
  selector: 'yt-add-item-form',
  template: ``,
})
class TestComponent {}

describe('AddItemPageComponent', () => {
  let component: AddItemPageComponent
  let fixture: ComponentFixture<AddItemPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemPageComponent, TestComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddItemPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
