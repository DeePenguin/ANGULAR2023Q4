import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { GroupsDialogsStoreModule } from '../groups-dialogs-store/groups-dialogs-store.module'
import { GroupsEffects } from './groups.effects'
import { groupsReducer } from './groups.reducer'
import { GroupsFacade } from './services/groups-facade.service'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { GroupsHttpService } from 'src/app/repositories/groups/services/groups-http.service'
import { GroupsService } from 'src/app/repositories/groups/services/groups.service'

@NgModule({
  imports: [
    GroupsDialogsStoreModule,
    StoreModule.forFeature(StoreFeatureNames.GROUPS, groupsReducer),
    EffectsModule.forFeature(GroupsEffects),
  ],
  providers: [GroupsFacade, GroupsService, GroupsHttpService],
})
export class GroupsStoreModule {}
