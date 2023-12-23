export function convertArray<T, E>(arr: T[], converter: (t: T) => E): E[] | undefined {
  if (!Array.isArray(arr)) {
    return
  }

  return arr.filter(Boolean).map(el => converter(el))
}
