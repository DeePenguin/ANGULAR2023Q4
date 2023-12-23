import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { TuiDialogService } from '@taiga-ui/core'
import { TUI_PROMPT, type TuiPromptData } from '@taiga-ui/kit'
import { map, take, takeUntil } from 'rxjs'

import { DialogsFacade } from '../../dialogs-store/services/dialogs-facade.service'
import type { Timer } from 'src/app/common/tools/timer'
import { TimerService } from 'src/app/core/services/timer.service'
import { UsersFacade } from 'src/app/core/store/users-store/services/users-facade.service'

@Component({
  selector: 'cn-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'page page--fixed',
  },
})
export class DialogPageComponent implements OnInit {
  private dialogs$ = this.dialogsFacade.dialogs$
  private dialogId = ''
  private dialogTimer!: Timer
  public isLoading$ = this.dialogsFacade.isLoading$
  public error$ = this.dialogsFacade.dialogDoesNotExist$
  public dialog$ = this.dialogs$.pipe(map(dialogs => dialogs[this.dialogId]))
  public timer$!: Timer['timer$']

  // eslint-disable-next-line max-params
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogsFacade: DialogsFacade,
    private usersFacade: UsersFacade,
    private timerService: TimerService,
    private dialogs: TuiDialogService,
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService,
  ) {}

  public ngOnInit(): void {
    this.usersFacade.getUsers()
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.dialogId = params.get('dialogId')!
      this.dialogsFacade.getMessages(this.dialogId)
      this.dialogTimer = this.timerService.createTimer(this.dialogId)
      this.timer$ = this.dialogTimer.timer$
    })
  }

  public update(): void {
    this.dialogsFacade.updateDialog(this.dialogId, () => {
      this.dialogTimer.start()
    })
  }

  public showRemovePrompt(): void {
    const data: TuiPromptData = {
      content: 'Are you sure you want to remove this conversation?',
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
          this.removeDialog(this.dialogId)
        }
      })
  }

  public sendMessage(message: string): void {
    this.dialogsFacade.sendMessage(this.dialogId, message)
  }

  public removeDialog(id: string): void {
    this.dialogsFacade.removeDialog(id, () => {
      this.router.navigate(['/']).catch(console.error)
    })
  }
}
