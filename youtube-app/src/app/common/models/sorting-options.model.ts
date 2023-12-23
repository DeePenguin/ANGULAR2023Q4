export interface SortingOptions<T extends unknown[]> {
  criterion: T[number]
  direction: -1 | 1
}
