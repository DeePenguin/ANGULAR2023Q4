import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LetModule } from '@ngrx/component'
import { TuiButtonModule } from '@taiga-ui/core'

import { ThemeService } from 'src/app/core/services/theme.service'

@Component({
  selector: 'cn-theme',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, LetModule],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  public isDark$ = this.themeService.isDark$
  constructor(private themeService: ThemeService) {}

  public toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}
