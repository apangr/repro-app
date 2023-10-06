import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[tfFocus]',
})
export class FocusDirective implements OnChanges {
  @Input() focus: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.focus) {
      this.hostElement.nativeElement.focus();
    }
  }
}
