import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SearchSettingsComponent } from './components/search-settings/search-settings.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { ButtonComponent } from 'src/app/common/components/button/button.component'
import { SearchFormComponent } from 'src/app/common/components/search-form/search-form.component'
import { SearchService } from 'src/app/core/services/search/search.service'

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

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isSearchSettingsVisible = false

  constructor(private searchService: SearchService) {}

  public toggleSettingsVisibility(): void {
    this.isSearchSettingsVisible = !this.isSearchSettingsVisible
  }

  public changeSearchQuery(query: string): void {
    this.searchService.changeQuery(query)
  }
}
