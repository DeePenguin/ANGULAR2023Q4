import { Directive, ElementRef, Inject, Input, type OnInit, Optional, Renderer2, SkipSelf } from '@angular/core'

import { DateToColorMap } from './models/date-to-color-map.model'
import { DATE_TO_COLOR_MAP } from './tokens/date-to-color-map.token'

const millisecondsInTimePeriod = {
  WEEK: 604_800_000,
  MONTH: 2_592_000_000,
  HALF_YEAR: 15_552_000_000,
}

const defaultDateToColorMap: DateToColorMap = {
  lessThanOneWeek: '#07a9ff',
  lessThanOneMonth: '#fa00a8',
  lessThanHalfYear: '#ff8a00',
  moreThanHalfYear: '#8600ff',
}

@Directive({
  selector: '[ytBorderColorByDate]',
  standalone: true,
  providers: [{ provide: DATE_TO_COLOR_MAP, useValue: defaultDateToColorMap }],
})
export class BorderColorByDateDirective implements OnInit {
  @Input() public date!: string

  private element = this.el.nativeElement
  private dateNow = Date.now()
  private colorMap: DateToColorMap
  private color = ''
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(DATE_TO_COLOR_MAP) private readonly defaultColorMap: DateToColorMap,
    @Inject(DATE_TO_COLOR_MAP) @SkipSelf() @Optional() private readonly providedDateToColorMap: DateToColorMap,
  ) {
    this.colorMap = providedDateToColorMap ?? defaultColorMap
  }

  public ngOnInit(): void {
    this.color = this.getColorByDate(this.date)
    this.renderer.setStyle(this.element, 'borderColor', this.color)
  }

  private getColorByDate(date: string): string {
    const timeDiff = this.dateNow - Number(new Date(date))

    if (timeDiff <= millisecondsInTimePeriod.WEEK) {
      return this.colorMap.lessThanOneWeek
    }

    if (timeDiff <= millisecondsInTimePeriod.MONTH) {
      return this.colorMap.lessThanOneMonth
    }

    if (timeDiff <= millisecondsInTimePeriod.HALF_YEAR) {
      return this.colorMap.lessThanHalfYear
    }

    return this.colorMap.moreThanHalfYear
  }
}
