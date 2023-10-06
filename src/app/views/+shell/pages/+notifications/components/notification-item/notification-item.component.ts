import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/root-store';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
  selector: 'tf-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationItemComponent implements OnDestroy {
  @Input() notification: any;
  _unsubscribe = new Subject<void>();
  navArrowRigthIcon = faChevronRight;
  UserNotificationType = null;
  constructor(
    private readonly store: Store<AppState>,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onNotification() {}
  onUserProfile(userId: string | undefined): void {
    if (userId) this.router.navigate(['profile', userId]);
  }
}
