/**
 * Конвертер из одного типа массива в другой
 *
 * @param arr - входящий массив элементов
 * @param converter - функция, производящая конвертацию
 */
export function convertArray<T, E>(arr: T[], converter: (t: T) => E): E[] | undefined {
  if (!Array.isArray(arr)) {
    return
  }

  return arr.filter(Boolean).map(el => converter(el))
}
