import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { GroupsDialogsEffects } from './groups-dialogs.effects'
import { groupsDialogsReducer } from './groups-dialogs.reducer'
import { GroupsDialogsFacade } from './services/groups-dialogs-facade.service'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { GroupsHttpService } from 'src/app/repositories/groups/services/groups-http.service'
import { GroupsService } from 'src/app/repositories/groups/services/groups.service'

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeatureNames.GROUPS_DIALOGS, groupsDialogsReducer),
    EffectsModule.forFeature(GroupsDialogsEffects),
  ],
  providers: [GroupsDialogsFacade, GroupsService, GroupsHttpService],
})
export class GroupsDialogsStoreModule {}
