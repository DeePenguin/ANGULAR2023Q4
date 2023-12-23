import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { LoginFormComponent } from './login-form.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service'

const mockAuthService = {
  login: jest.fn(),
  logout: jest.fn(),
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent
  let fixture: ComponentFixture<LoginFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [MatFormFieldModule, ButtonComponent, MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: AuthorizationService, useFactory: () => mockAuthService }],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
