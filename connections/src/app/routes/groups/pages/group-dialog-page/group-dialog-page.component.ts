import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { TuiDialogService } from '@taiga-ui/core'
import { TUI_PROMPT, type TuiPromptData } from '@taiga-ui/kit'
import { map, take, takeUntil } from 'rxjs'

import { GroupsDialogsFacade } from '../../groups-dialogs-store/services/groups-dialogs-facade.service'
import { GroupsFacade } from '../../groups-store/services/groups-facade.service'
import type { Timer } from 'src/app/common/tools/timer'
import { TimerService } from 'src/app/core/services/timer.service'
import { UsersFacade } from 'src/app/core/store/users-store/services/users-facade.service'

@Component({
  selector: 'cn-group-dialog-page',
  templateUrl: './group-dialog-page.component.html',
  styleUrls: ['./group-dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'page page--fixed',
  },
})
export class GroupDialogPageComponent implements OnInit {
  private dialogs$ = this.groupsDialogsFacade.dialogs$
  private groupId = ''
  private dialogTimer!: Timer
  public isLoading$ = this.groupsDialogsFacade.isLoading$
  public error$ = this.groupsDialogsFacade.dialogDoesNotExist$
  public dialog$ = this.dialogs$.pipe(map(dialogs => dialogs[this.groupId]))
  public timer$!: Timer['timer$']

  // eslint-disable-next-line max-params
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsDialogsFacade: GroupsDialogsFacade,
    private groupsFacade: GroupsFacade,
    private usersFacade: UsersFacade,
    private timerService: TimerService,
    private dialogs: TuiDialogService,
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService,
  ) {}

  public ngOnInit(): void {
    this.usersFacade.getUsers()
    this.groupsFacade.getGroups()
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.groupId = params.get('groupId')!
      this.groupsDialogsFacade.getMessages(this.groupId)
      this.dialogTimer = this.timerService.createTimer(this.groupId)
      this.timer$ = this.dialogTimer.timer$
    })
  }

  public start(): void {
    this.dialogTimer.start()
  }

  public update(): void {
    this.groupsDialogsFacade.updateDialog(this.groupId, () => {
      this.dialogTimer.start()
    })
  }

  public showRemovePrompt(): void {
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
          this.removeGroup(this.groupId)
        }
      })
  }

  public sendMessage(message: string): void {
    this.groupsDialogsFacade.sendMessage(this.groupId, message)
  }

  public removeGroup(id: string): void {
    this.groupsFacade.removeGroup(id, () => {
      this.router.navigate(['/']).catch(console.error)
    })
  }
}
