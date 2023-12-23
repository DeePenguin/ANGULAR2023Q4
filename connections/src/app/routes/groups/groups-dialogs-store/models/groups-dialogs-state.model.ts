import type { Dialog } from './dialog.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'

export interface GroupsDialogsState {
  dialogs: Record<string, Dialog>
  isLoading: boolean
  error: ResponseError | null
}
