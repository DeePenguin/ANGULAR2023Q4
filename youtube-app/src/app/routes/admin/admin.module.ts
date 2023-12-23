import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { AdminRoutingModule } from './admin-routing.module'
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component'
import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'

@NgModule({
  declarations: [AddItemPageComponent, AddItemFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ButtonComponent,
  ],
})
export class AdminModule {}
