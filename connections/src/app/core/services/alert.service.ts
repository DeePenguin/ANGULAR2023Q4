import { Inject, Injectable } from '@angular/core'
import { TuiAlertService } from '@taiga-ui/core'

@Injectable()
export class AlertService {
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  public showError(message: string, label: string = 'Error'): void {
    this.alerts
      .open(message, {
        label,
        status: 'error',
      })
      .subscribe()
  }

  public showSuccess(message: string, label: string = 'Success'): void {
    this.alerts
      .open(message, {
        label,
        status: 'success',
      })
      .subscribe()
  }
}
