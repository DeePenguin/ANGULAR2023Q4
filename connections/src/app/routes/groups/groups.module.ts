import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LetModule } from '@ngrx/component'
import { TuiAutoFocusModule } from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import { TuiFieldErrorPipeModule, TuiInputModule, TuiIslandModule } from '@taiga-ui/kit'

import { GroupItemComponent } from './components/group-item/group-item.component'
import { GroupsListComponent } from './components/groups-list/groups-list.component'
import { GroupsComponent } from './components/groups/groups.component'
import { GroupsRoutingModule } from './groups-routing.module'
import { GroupDialogPageComponent } from './pages/group-dialog-page/group-dialog-page.component'
import { DialogMessagesComponent } from 'src/app/common/components/dialog/components/dialog-messages/dialog-messages.component'
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component'
import { ScrollableBlockComponent } from 'src/app/common/components/scrollable-block/scrollable-block.component'
import { UpdateButtonComponent } from 'src/app/common/components/update-button/update-button.component'
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component'

@NgModule({
  declarations: [GroupsListComponent, GroupsComponent, GroupItemComponent, GroupDialogPageComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    LetModule,
    DialogComponent,
    UpdateButtonComponent,
    DialogMessagesComponent,
    TuiLinkModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiHintModule,
    TuiFieldErrorPipeModule,
    TuiDialogModule,
    TuiAutoFocusModule,
    TuiIslandModule,
    NotFoundComponent,
    ScrollableBlockComponent,
  ],
  exports: [GroupsComponent],
})
export class GroupsModule {}
