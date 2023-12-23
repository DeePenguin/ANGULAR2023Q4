import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AddItemFormComponent } from './add-item-form.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent
  let fixture: ComponentFixture<AddItemFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemFormComponent],
      imports: [
        ReactiveFormsModule,
        ButtonComponent,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AddItemFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
