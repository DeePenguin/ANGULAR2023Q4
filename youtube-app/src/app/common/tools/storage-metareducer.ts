import type { Action, ActionReducer } from '@ngrx/store'

import type { StorageService } from 'src/app/core/storage/services/storage.service'

export const storageMetaReducer = <S, A extends Action = Action>(
  saveKeys: Array<keyof S>,
  localStorageKey: string,
  storageService: StorageService,
): ((reducer: ActionReducer<S, A>) => (state: S, action: A) => S) => {
  let isInit = true

  return (reducer: ActionReducer<S, A>) =>
    (state: S, action: A): S => {
      const nextState = reducer(state, action)

      if (isInit) {
        isInit = false
        const savedState = storageService.getItem<Partial<S>>(localStorageKey)

        return { ...nextState, ...savedState }
      }

      const stateToSave = Object.fromEntries(saveKeys.map(key => [key, nextState[key]]))
      storageService.setItem(localStorageKey, stateToSave)

      return nextState
    }
}
