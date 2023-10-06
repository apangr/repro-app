import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[tfDropZone]',
})
export class DropZoneDirective {
  @Output() filesDropped = new EventEmitter<any>();

  @HostBinding('style.opacity') private opacity = '1';
  @HostBinding('style.border') private border = 'none';

  @HostListener('dragover', ['$event']) public onDragOver(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    this.opacity = '0.8';
    this.border = 'dotted 2px #FF10AA';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    this.opacity = '1';
    this.border = 'none';
  }

  @HostListener('drop', ['$event']) public ondrop(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    this.opacity = '1';
    this.border = 'none';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }
}
