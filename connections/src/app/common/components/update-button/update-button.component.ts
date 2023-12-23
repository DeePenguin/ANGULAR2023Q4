import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, type OnDestroy, type OnInit } from '@angular/core'
import { LetModule } from '@ngrx/component'
import { TuiButtonModule } from '@taiga-ui/core'
import { Observable, Subscription, tap } from 'rxjs'

@Component({
  selector: 'cn-update-button',
  standalone: true,
  imports: [CommonModule, LetModule, TuiButtonModule],
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateButtonComponent implements OnInit, OnDestroy {
  @Input() public isLoading = false
  @Input() public timer$!: Observable<number>
  public isDisabled = false
  public subs = new Subscription()

  public ngOnInit(): void {
    this.subs.add(
      this.timer$
        .pipe(
          tap(time => {
            if (time === 0) {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          }),
        )
        .subscribe(),
    )
  }

  public onClick(): void {
    this.isDisabled = true
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
