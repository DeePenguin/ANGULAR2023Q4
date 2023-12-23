import { ElementRef, Renderer2 } from '@angular/core'
import { inject } from '@angular/core/testing'

import { BorderColorByDateDirective } from './border-color-by-date.directive'
import type { DateToColorMap } from './models/date-to-color-map.model'
import { DATE_TO_COLOR_MAP } from './tokens/date-to-color-map.token'

Date.now = jest.fn(() => 1698812819792)

describe('BorderColorByDateDirective', () => {
  it('should create an instance', () => {
    inject(
      [ElementRef, Renderer2, DATE_TO_COLOR_MAP],
      (
        elementRef: ElementRef<HTMLElement>,
        renderer: Renderer2,
        defaultConfig: DateToColorMap,
        providedConfig: DateToColorMap,
      ) => {
        const directive = new BorderColorByDateDirective(elementRef, renderer, defaultConfig, providedConfig)
        expect(directive).toBeTruthy()
      },
    )
  })
})
