import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginPageComponent } from './login-page.component'

@Component({
  selector: 'yt-login-form',
  template: ``,
})
class TestComponent {}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent
  let fixture: ComponentFixture<LoginPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent, TestComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
