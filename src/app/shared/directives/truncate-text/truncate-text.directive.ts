import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[tfTruncateText]',
})
export class TruncateTextDirective implements AfterViewInit {
  @Input() maxCharacters = 15;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.truncate();
  }

  private truncate(): void {
    const spanElement: HTMLElement = this.elementRef.nativeElement;
    const text = spanElement.innerText;

    if (text.length > this.maxCharacters) {
      spanElement.innerText = text.substring(0, this.maxCharacters) + '...';
      spanElement.setAttribute('title', text);
    }
  }
}
