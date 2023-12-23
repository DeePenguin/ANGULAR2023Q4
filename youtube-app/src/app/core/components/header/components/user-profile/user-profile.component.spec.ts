import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { LetDirective } from '@rx-angular/template/let'
import { of } from 'rxjs'

import { UserProfileComponent } from './user-profile.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service'

const mockAuthService = {
  login: jest.fn(),
  logout: jest.fn(),
  userInfo$: of({ name: 'Name' }),
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, ButtonComponent, LetDirective, RouterTestingModule],
      providers: [{ provide: AuthorizationService, useFactory: () => mockAuthService }],
    }).compileComponents()

    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
