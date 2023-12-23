import { ChangeDetectionStrategy, Component, EventEmitter, type OnDestroy, type OnInit, Output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs'

@Component({
  selector: 'yt-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() public filterChange = new EventEmitter<string>()
  public filter = this.fb.control('')
  private subs = new Subscription()

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.subs.add(
      this.filter.valueChanges
        .pipe(
          debounceTime(500),
          map(value => (value?.trim() || '').toLowerCase()),
          distinctUntilChanged(),
        )
        .subscribe(value => {
          this.filterChange.emit(value)
        }),
    )
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
