import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ProfileEffects } from './profile.effects'
import { profileReducer } from './profile.reducer'
import { ProfileFacade } from './services/profile-facade.service'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeatureNames.PROFILE, profileReducer),
    EffectsModule.forFeature(ProfileEffects),
  ],
  providers: [ProfileFacade],
})
export class ProfileStoreModule {}
