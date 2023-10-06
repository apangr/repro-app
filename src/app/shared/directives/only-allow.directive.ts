import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tfOnlyAllow]',
})
export class OnlyAllowDirective {
  @Input() allowRegex!: string;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const regex = new RegExp(this.allowRegex);
    if (regex.test(event.key)) {
      return true;
    }
    event.preventDefault();
    return false;
  }
}
