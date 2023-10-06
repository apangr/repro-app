import { ElementRef } from '@angular/core';
import { TruncateTextDirective } from './truncate-text.directive';
import { inject } from '@angular/core/testing';

xdescribe('TruncateTextDirective', () => {
  it('should create an instance', inject(
    [ElementRef],
    (elementRef: ElementRef) => {
      const directive = new TruncateTextDirective(elementRef);
      expect(directive).toBeTruthy();
    }
  ));
});
