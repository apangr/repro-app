import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[tfTextareaAutoresize]',
})
export class TextareaAutoresizeDirective implements OnInit {
  @Input() maxHeight: number;

  constructor(private elementRef: ElementRef) {}

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    if (this.maxHeight) {
      const elementHeight = Number(
        this.elementRef.nativeElement.style.height.split('px')[0]
      );
      if (elementHeight < this.maxHeight) {
        this.elementRef.nativeElement.style.height = '0';
        this.elementRef.nativeElement.style.height =
          this.elementRef.nativeElement.scrollHeight + 'px';
      }
    } else {
      this.elementRef.nativeElement.style.height = '0';
      this.elementRef.nativeElement.style.height =
        this.elementRef.nativeElement.scrollHeight + 'px';
    }
  }
}
