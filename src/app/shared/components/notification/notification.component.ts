import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  NotificationOptions,
  NOTIFICATION_OPTIONS,
} from '@app/core/models/notification.types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'tf-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  closeIcon = faTimes;
  close = new Subject<void>();
  constructor(
    @Inject(NOTIFICATION_OPTIONS) public options: NotificationOptions
  ) {}
}
