import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../localized-pipe/localized-pipe.pipe';

@Pipe({
  name: 'tfDateAgo',
})
export class DateAgoPipe implements PipeTransform {
  constructor(
    private translateService: TranslateService,
    private localizedPipe: LocalizedDatePipe
  ) {}
  intervalsShort = {
    year: 31536000,
    month: 2592000,
    w: 604800,
    d: 86400,
    hr: 3600,
    min: 60,
    s: 1,
  };
  intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  transform(value: any, type: 'short' | 'normal'): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      // Less than 30 seconds ago will show as 'Just now'
      if (seconds < 29) return this.translateService.instant('justNow');

      let counter;
      if (type === 'short') {
        for (const i in this.intervalsShort) {
          counter = Math.floor(seconds / (this.intervalsShort as any)[i]);
          if (counter > 0) return counter + ' ' + i;
        }
      }
      if (type === 'normal') {
        for (const i in this.intervals) {
          counter = Math.floor(seconds / (this.intervals as any)[i]);
          if (counter > 0)
            if (counter === 1) {
              // Show 'yesterday' if the interval is greater than hours
              if (i !== 'hour' && i !== 'minute' && i !== 'second')
                return this.translateService.instant('yesterday');
              return (
                counter +
                ' ' +
                this.translateService.instant(i) +
                ' ' +
                this.translateService.instant('ago')
              ); // singular (Ex: 1 day ago)
            } else {
              // Show the normal date if the interval is greater than hours
              if (i !== 'hour' && i !== 'minute' && i !== 'second')
                return this.localizedPipe.transform(value) as string;

              return (
                counter +
                ' ' +
                this.translateService.instant(i) +
                this.translateService.instant('sago')
              ); // plural (Ex: 2 days ago)
            }
        }
      }
    }
    return value;
  }
}
