import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest, filter, map } from 'rxjs'

import { dialogPageActions } from '../actions/dialog-page.actions'
import { homePageActions } from '../actions/home-page.actions'
import { selectConversations, selectCount, selectError, selectIsLoading } from '../conversations.selectors'
import type { UserNames } from 'src/app/core/store/users-store/models/user-names.model'
import { UsersFacade } from 'src/app/core/store/users-store/services/users-facade.service'
import { AuthFacade } from 'src/app/routes/auth/auth-store/services/auth-facade.service'

@Injectable()
export class ConversationsFacade {
  private currentUserId = this.authFacade.uid$
  public isLoading$ = combineLatest([this.store.select(selectIsLoading), this.usersFacade.isLoading$]).pipe(
    map(({ 0: isLoading, 1: isUsersLoading }) => isLoading || isUsersLoading),
  )
  public error$ = combineLatest([this.store.select(selectError), this.usersFacade.error$]).pipe(
    map(({ 0: error, 1: usersError }) => error || usersError),
  )
  public count$ = this.store.select(selectCount)

  public conversations$ = this.store.select(selectConversations)

  public users$ = combineLatest([
    this.store.select(selectConversations),
    this.usersFacade.userNames$,
    this.currentUserId,
  ]).pipe(
    map(([conversations, userNames, currentUserId]) => ({
      conversations,
      userNames,
      currentUserId,
    })),
    filter((value): value is { conversations: Record<string, string>; userNames: UserNames; currentUserId: string } =>
      Boolean(value.conversations && value.userNames && value.currentUserId),
    ),
    map(({ conversations, userNames, currentUserId }) =>
      Object.values(userNames)
        .filter(user => user.uid !== currentUserId)
        .map(user => ({ ...user, dialog: conversations[user.uid] }))
        .sort((a, b) => Number(Boolean(b.dialog)) - Number(Boolean(a.dialog))),
    ),
  )

  constructor(
    private store: Store,
    private usersFacade: UsersFacade,
    private authFacade: AuthFacade,
  ) {}

  public getConversations(): void {
    this.usersFacade.getUsers()
    this.store.dispatch(homePageActions.getConversations())
  }

  public updateConversations(timer: () => void): void {
    this.usersFacade.updateUsers()
    this.store.dispatch(homePageActions.updateConversations({ timer }))
  }

  public createConversation(uid: string): void {
    this.store.dispatch(homePageActions.createConversation({ uid }))
  }

  public removeConversation(id: string): void {
    this.store.dispatch(dialogPageActions.removeConversation({ id }))
  }
}
