import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { TuiDialogService } from '@taiga-ui/core'
import { TUI_PROMPT, type TuiPromptData } from '@taiga-ui/kit'
import { type Subscriber, takeUntil } from 'rxjs'

import { GroupsFacade } from '../../groups-store/services/groups-facade.service'
import { groupNameValidator } from 'src/app/common/validators/group-name.validator'
import { TimerService } from 'src/app/core/services/timer.service'

@Component({
  selector: 'cn-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent {
  private groupsTimer = this.timerService.createTimer('groups')
  public isLoading$ = this.groupsFacade.isLoading$
  public groups$ = this.groupsFacade.groups$
  public timer$ = this.groupsTimer.timer$
  public isModalOpen = false
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30), groupNameValidator]],
  })

  constructor(
    private groupsFacade: GroupsFacade,
    private timerService: TimerService,
    private fb: NonNullableFormBuilder,
    private dialogs: TuiDialogService,
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService,
  ) {
    this.groupsFacade.getGroups()
  }

  public updateGroups(): void {
    this.groupsFacade.updateGroups(() => {
      this.groupsTimer.start()
    })
  }

  public showRemovePrompt(id: string): void {
    const data: TuiPromptData = {
      content: 'Are you sure you want to remove this group?',
      yes: 'Yes',
      no: 'Cancel',
    }

    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        size: 's',
        data,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response) {
          this.removeGroup(id)
        }
      })
  }

  public removeGroup(id: string): void {
    this.groupsFacade.removeGroup(id)
  }

  public showCreateForm(): void {
    this.isModalOpen = true
  }

  public resetForm(observer: Subscriber<unknown>): void {
    observer.complete()
    this.form.reset()
    this.form.enable()
  }

  public createGroup(observer: Subscriber<unknown>): void {
    if (this.form.invalid) {
      return
    }

    this.form.disable()
    this.groupsFacade.createGroup(
      this.form.getRawValue().name,
      () => {
        this.resetForm(observer)
      },
      () => {
        this.form.enable()
      },
    )
  }
}
