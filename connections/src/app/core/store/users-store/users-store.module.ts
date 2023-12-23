import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { UsersFacade } from './services/users-facade.service'
import { UsersEffects } from './users.effects'
import { usersReducer } from './users.reducer'
import { StoreFeatureNames } from 'src/app/common/models/store-feature-names.enum'
import { UsersHttpService } from 'src/app/repositories/users/services/users-http.service'
import { UsersService } from 'src/app/repositories/users/services/users.service'

@NgModule({
  imports: [StoreModule.forFeature(StoreFeatureNames.USERS, usersReducer), EffectsModule.forFeature(UsersEffects)],
  providers: [UsersFacade, UsersHttpService, UsersService],
})
export class UsersStoreModule {}
