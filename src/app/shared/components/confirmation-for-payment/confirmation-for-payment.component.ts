import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Dialog } from '@app/core/models/modal.types';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'tf-confirmation-for-payment',
  templateUrl: './confirmation-for-payment.component.html',
  styleUrls: ['./confirmation-for-payment.component.scss'],
})
export class ConfirmationForPaymentComponent implements Dialog<boolean> {
  resolveWith: (result?: boolean) => void;
  user: any;
  price: number;
  type: 'subscription' | 'post' = 'subscription';
  subscribeText = 'pay-confirmation.subscribe';
  postText = 'pay-confirmation.post';
  constructor(
    private translate: TranslatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  get dialogMessage(): string {
    let message = this.translate.transform(
      this.type === 'subscription'
        ? 'pay-confirmation.subscriptionMsg'
        : 'pay-confirmation.postMsg'
    );
    message = message.replace('{username}', `@${this.user.username}`);
    message = message.replace(
      '{price}',
      this.currencyPipe.transform(this.price)
    );
    return message;
  }

  onConfirm() {
    this.resolveWith(true);
  }
  onCancel() {
    this.resolveWith(false);
  }
}
