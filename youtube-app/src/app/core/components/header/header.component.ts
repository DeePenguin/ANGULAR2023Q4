import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, type OnDestroy, type OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SearchSettingsComponent } from './components/search-settings/search-settings.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { HeaderControllerService } from './header.controller'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { SearchFormComponent } from 'src/app/common/components/search-form/search-form.component'

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule,
    UserProfileComponent,
    SearchSettingsComponent,
    SearchFormComponent,
    ButtonComponent,
  ],
  providers: [HeaderControllerService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isSearchSettingsVisible = false

  constructor(private controller: HeaderControllerService) {}

  public ngOnInit(): void {
    this.controller.init()
  }

  public toggleSettingsVisibility(): void {
    this.isSearchSettingsVisible = !this.isSearchSettingsVisible
  }

  public changeSearchQuery(query: string): void {
    this.controller.changeSearchQuery(query)
  }

  public ngOnDestroy(): void {
    this.controller.destroy()
  }
}
