import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { FavoriteButtonComponent } from './favorite-button.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent
  let fixture: ComponentFixture<FavoriteButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteButtonComponent, ButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FavoriteButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('icon should be outline by default', () => {
    const { icon } = component
    expect(icon).toEqual('favorite_outline')
  })

  it('icon should be favorite if isFavorite', () => {
    component.isFavorite = true
    fixture.detectChanges()
    const { icon } = component
    expect(icon).toEqual('favorite')
  })
})
