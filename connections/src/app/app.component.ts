import { Component } from '@angular/core'
import { map } from 'rxjs'

import { ThemeService } from './core/services/theme.service'

@Component({
  selector: 'cn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isDark$ = this.themeService.isDark$
  public mode$ = this.isDark$.pipe(map(isDark => (isDark ? 'onDark' : null)))
  constructor(private themeService: ThemeService) {}
}
