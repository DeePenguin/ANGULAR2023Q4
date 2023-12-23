import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { DialogsStoreModule } from '../dialogs-store/dialogs-store.module'
import { ConversationsEffects } from './conversations.effects'
import { conversationsReducer } from './conversations.reducer'
import { ConversationsFacade } from './services/conversations-facade.service'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { ConversationsHttpService } from 'src/app/repositories/conversations/services/conversations-http.service'
import { ConversationsService } from 'src/app/repositories/conversations/services/conversations.service'

@NgModule({
  imports: [
    DialogsStoreModule,
    StoreModule.forFeature(StoreFeatureNames.CONVERSATIONS, conversationsReducer),
    EffectsModule.forFeature(ConversationsEffects),
  ],
  providers: [ConversationsFacade, ConversationsService, ConversationsHttpService],
})
export class ConversationsStoreModule {}
