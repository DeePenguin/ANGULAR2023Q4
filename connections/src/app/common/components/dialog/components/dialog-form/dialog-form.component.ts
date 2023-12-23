import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, type OnDestroy, Output } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { TuiButtonModule, TuiGroupModule, TuiTextfieldControllerModule } from '@taiga-ui/core'
import { TuiInputModule } from '@taiga-ui/kit'
import { map, Subscription } from 'rxjs'

@Component({
  selector: 'cn-dialog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiGroupModule,
  ],
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFormComponent implements OnDestroy {
  @Output() public send = new EventEmitter<{ message: string }>()
  private subs = new Subscription()
  public form = this.fb.group({
    message: '',
  })
  public isSendButtonDisabled = true

  constructor(private fb: NonNullableFormBuilder) {
    this.form.controls.message.valueChanges.pipe(map(value => value.trim().length > 0)).subscribe(isValid => {
      this.isSendButtonDisabled = !isValid
    })
  }

  public sendMessage(): void {
    if (this.isSendButtonDisabled) {
      return
    }

    this.send.emit(this.form.getRawValue())
    this.form.reset()
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
