import { TranslateService } from '@ngx-translate/core';
import { LocalizedDatePipe } from './localized-pipe.pipe';
import { inject } from '@angular/core/testing';

xdescribe('LocalizedDatePipe', () => {
  it('create an instance', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new LocalizedDatePipe(translateService);
      expect(pipe).toBeTruthy();
    }
  ));
});
