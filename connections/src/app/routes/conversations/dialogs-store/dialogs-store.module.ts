import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { GroupsDialogsEffects } from './dialogs.effects'
import { dialogsReducer } from './dialogs.reducer'
import { DialogsFacade } from './services/dialogs-facade.service'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { ConversationsHttpService } from 'src/app/repositories/conversations/services/conversations-http.service'
import { ConversationsService } from 'src/app/repositories/conversations/services/conversations.service'

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeatureNames.DIALOGS, dialogsReducer),
    EffectsModule.forFeature(GroupsDialogsEffects),
  ],
  providers: [DialogsFacade, ConversationsService, ConversationsHttpService],
})
export class DialogsStoreModule {}
