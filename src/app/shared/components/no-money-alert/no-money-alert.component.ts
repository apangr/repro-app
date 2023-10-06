import { Component } from '@angular/core';
import { Dialog } from '@app/core/models/modal.types';

@Component({
  selector: 'tf-no-money-alert',
  templateUrl: './no-money-alert.component.html',
  styleUrls: ['./no-money-alert.component.scss'],
})
export class NoMoneyAlertComponent implements Dialog<boolean> {
  resolveWith: (result?: boolean) => void;

  onCancel(): void {
    this.resolveWith(false);
  }

  goToWallet() {
    this.resolveWith(true);
  }
}
