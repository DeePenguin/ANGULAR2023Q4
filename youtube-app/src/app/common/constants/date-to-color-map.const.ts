import type { DateToColorMap } from 'src/app/common/directives/border-color-by-date/models/date-to-color-map.model'

export const dateToColorMap: DateToColorMap = {
  lessThanOneWeek: '#4051b5',
  lessThanOneMonth: '#1d8f1d',
  lessThanHalfYear: '#ffe300',
  moreThanHalfYear: '#ed3333',
}
