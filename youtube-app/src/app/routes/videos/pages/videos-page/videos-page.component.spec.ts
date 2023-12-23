import { Component, Input } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { VideosPageComponent } from './videos-page.component'
import { VideosService } from 'src/app/core/services/videos/videos.service'

const mockService = {
  videos$: of([]),
}

@Component({
  selector: 'yt-videos-list',
  template: ``,
})
class TestComponent {
  @Input() public videos = []
}

describe('VideosPageComponent', () => {
  let component: VideosPageComponent
  let fixture: ComponentFixture<VideosPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideosPageComponent, TestComponent],
      providers: [{ provide: VideosService, useFactory: () => mockService }],
    }).compileComponents()

    fixture = TestBed.createComponent(VideosPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
