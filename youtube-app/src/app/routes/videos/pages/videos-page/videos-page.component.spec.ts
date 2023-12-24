import { Component, Input } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator'
import { LetDirective } from '@rx-angular/template/let'
import { of } from 'rxjs'

import { VideosFacade } from '../../videos-store/services/videos.facade'
import { VideosPageComponent } from './videos-page.component'

class VideosFacadeStub {
  public customVideo$ = of([])
  public pagination$ = of({})
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
      imports: [MatPaginatorModule, MatExpansionModule, LetDirective],
      providers: [{ provide: VideosFacade, useClass: VideosFacadeStub }],
    }).compileComponents()

    fixture = TestBed.createComponent(VideosPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
