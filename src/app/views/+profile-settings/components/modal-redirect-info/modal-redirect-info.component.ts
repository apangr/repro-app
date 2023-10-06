import { Component } from '@angular/core';
import { Dialog } from '@app/core/models/modal.types';

@Component({
  selector: 'tf-modal-redirect-info',
  templateUrl: './modal-redirect-info.component.html',
  styleUrls: ['./modal-redirect-info.component.scss'],
})
export class ModalRedirectInfoComponent implements Dialog {
  message: string;
  resolveWith: (result?: boolean) => void;
  onConfirm(): void {
    this.resolveWith(true);
  }

  onCancel(): void {
    this.resolveWith(false);
  }
}
