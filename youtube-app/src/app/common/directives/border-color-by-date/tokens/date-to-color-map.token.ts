import { InjectionToken } from '@angular/core'

import type { DateToColorMap } from '../models/date-to-color-map.model'

export const DATE_TO_COLOR_MAP = new InjectionToken<DateToColorMap>('Color map for date border')
