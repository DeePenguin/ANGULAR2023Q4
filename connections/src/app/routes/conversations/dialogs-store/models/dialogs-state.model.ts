import type { Dialog } from 'src/app/common/models/dialog.model'
import type { ResponseError } from 'src/app/common/models/response-error.model'

export interface DialogsState {
  dialogs: Record<string, Dialog>
  isLoading: boolean
  error: ResponseError | null
}
