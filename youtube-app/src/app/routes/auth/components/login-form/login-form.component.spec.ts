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

const formValue = {
  email: 'example@example.com',
  password: 'Password1-!',
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
  it('submit button should be disabled by default', () => {
    const button = (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]')
    const isButtonDisabled = button?.attributes.getNamedItem('disabled')?.value
    expect(isButtonDisabled).toEqual('true')
  })

  it('submit button should be enabled when form is valid', () => {
    component.loginForm.setValue(formValue)
    fixture.detectChanges()
    const button = (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]')
    const isButtonDisabled = button?.attributes.getNamedItem('disabled')
    expect(isButtonDisabled).toBeFalsy()
  })

  it('click on submit button should call login', () => {
    const spyFn = jest.spyOn(mockAuthService, 'login')
    component.loginForm.setValue(formValue)
    fixture.detectChanges()
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button[type="submit"]')!
    button.click()
    expect(spyFn).toBeCalled()
  })
})
