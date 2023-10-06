import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '@app/root-store';
import {
  NotificationActions,
  selectNotifications,
} from '@app/root-store/notifications-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UserNotification } from './services/notification.models';

@Component({
  selector: 'tf-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  _unsubscribe = new Subject<void>();
  notifications: UserNotification[];
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.getNotifications();
  }
  getNotifications() {
    this.store.dispatch(
      NotificationActions.getUserNotifications({
        pageInfo: { limit: 15, offset: 0 },
      })
    );
    this.store.select(selectNotifications).subscribe((data) => {
      if (data.length) {
        this.notifications = data;
      }
    });
  }
}
