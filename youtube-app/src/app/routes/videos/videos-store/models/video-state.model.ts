export interface VideoState<T> {
  isLoading: boolean
  videoItem: T | null
  error: string | null
}
