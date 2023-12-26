import { ChangeDetectionStrategy, Component } from '@angular/core'
import type { RouterOutlet } from '@angular/router'
import { map } from 'rxjs'

import { slideInAnimation } from './common/animations/slide-in.animation'
import { ThemeService } from './core/services/theme.service'

@Component({
  selector: 'cn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class AppComponent {
  public isDark$ = this.themeService.isDark$
  public mode$ = this.isDark$.pipe(map(isDark => (isDark ? 'onDark' : null)))
  public isAnimationDisabled = true
  constructor(private themeService: ThemeService) {}

  public prepareRout(outlet: RouterOutlet): number {
    return (outlet.activatedRouteData['animateIndex'] as number) ?? 0
  }
}
