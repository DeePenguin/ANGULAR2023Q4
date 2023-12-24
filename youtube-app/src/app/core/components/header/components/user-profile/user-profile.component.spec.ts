import { Injectable } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies'
import { LetDirective } from '@rx-angular/template/let'
import { of } from 'rxjs'

import { UserProfileComponent } from './user-profile.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service'

const mockAuthService = {
  login: jest.fn(),
  logout: jest.fn(),
  userInfo$: of({ name: 'test' }),
}

@Injectable()
class TestingStrategyProvider extends RxStrategyProvider {
  constructor() {
    super({ primaryStrategy: 'native' })
  }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>
  let element: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, ButtonComponent, LetDirective, RouterTestingModule],
      providers: [
        { provide: AuthorizationService, useFactory: () => mockAuthService },
        { provide: RxStrategyProvider, useClass: TestingStrategyProvider },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
    component.userInfo$ = of(null)
    fixture.detectChanges()
    element = fixture.debugElement.nativeElement as HTMLElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render default name if user is unauthorized', () => {
    fixture.detectChanges()
    const nameElement = element.querySelector('.profile-name')
    expect(nameElement?.textContent).toEqual(component.defaultUserName)
  })
})
