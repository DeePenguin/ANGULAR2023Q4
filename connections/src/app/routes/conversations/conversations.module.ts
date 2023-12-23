import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LetModule } from '@ngrx/component'
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core'
import { TuiIslandModule } from '@taiga-ui/kit'

import { ConversationItemComponent } from './components/conversation-item/conversation-item.component'
import { ConversationsListComponent } from './components/conversations-list/conversations-list.component'
import { ConversationsComponent } from './components/conversations/conversations.component'
import { ConversationsRoutingModule } from './conversations-routing.module'
import { DialogPageComponent } from './pages/dialog-page/dialog-page.component'
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component'
import { ScrollableBlockComponent } from 'src/app/common/components/scrollable-block/scrollable-block.component'
import { UpdateButtonComponent } from 'src/app/common/components/update-button/update-button.component'
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component'

@NgModule({
  declarations: [DialogPageComponent, ConversationsComponent, ConversationsListComponent, ConversationItemComponent],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    LetModule,
    TuiIslandModule,
    TuiLoaderModule,
    TuiLinkModule,
    DialogComponent,
    ScrollableBlockComponent,
    UpdateButtonComponent,
    NotFoundComponent,
  ],
  exports: [ConversationsComponent],
})
export class ConversationsModule {}
