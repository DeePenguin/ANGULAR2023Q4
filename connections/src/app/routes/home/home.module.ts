import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TuiIslandModule } from '@taiga-ui/kit'

import { ConversationsModule } from '../conversations/conversations.module'
import { GroupsModule } from '../groups/groups.module'
import { HomeRoutingModule } from './home-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomeRoutingModule, TuiIslandModule, GroupsModule, ConversationsModule],
})
export class HomeModule {}
