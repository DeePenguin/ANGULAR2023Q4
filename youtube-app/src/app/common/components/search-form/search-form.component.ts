import { ChangeDetectionStrategy, Component, EventEmitter, type OnDestroy, type OnInit, Output } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Subscription } from 'rxjs'

import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'yt-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  imports: [ButtonComponent, MatFormFieldModule, MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output() public submitSearch = new EventEmitter<string>()
  @Output() public valueChange = new EventEmitter<string>()
  public search = this.fb.control('')
  private subs = new Subscription()

  constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.search.valueChanges.subscribe(value => {
      this.valueChange.emit(value)
    })
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
    this.submitSearch.emit(this.search.value)
  }
}
