import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  Dialog,
  MODAL_OPTIONS,
  ModalOptions,
} from '@app/core/models/modal.types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tf-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ConfirmationModalComponent implements Dialog<boolean> {
  isDelete: boolean;
  description = 'confirmation.delete.description';
  title = 'confirmation.delete.title';
  cautionMessage: string;

  constructor(@Inject(MODAL_OPTIONS) options: ModalOptions<any>) {
    this.isDelete = options.locals?.['isDelete'];

    const description = options.locals?.['description'];
    const title = options.locals?.['title'];

    if (description) {
      this.description = description;
    }

    if (title) {
      this.title = title;
    }
  }
  resolveWith: (result?: boolean) => void;

  onAccept(): void {
    this.resolveWith(true);
  }

  onArchive(): void {
    this.resolveWith(false);
  }
}
