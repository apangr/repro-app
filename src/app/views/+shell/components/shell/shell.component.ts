import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { MenuSidebarService } from '@app/core/services/menu-sidebar.service';
import { AppState, ProfileActions } from '@app/root-store';
import { MessagesActions } from '@app/root-store/messages';
import { NotificationActions } from '@app/root-store/notifications-store';
import { Store } from '@ngrx/store';
import { filter, Subject, take } from 'rxjs';

@Component({
  selector: 'tf-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShellComponent implements OnDestroy {
  _unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private menuSidebarService: MenuSidebarService,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    // Logic to adjust Live Options Sidebar
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd): void => {
        const url = event.url;
        if (url.includes('live')) {
          this.menuSidebarService.reduceMenu();
        } else {
          this.menuSidebarService.expandMenu();
        }
      });

    // When the user is logged in
    if (this.authService.isLoggedIn) {
      // Get Logged User Profile
      this.store.dispatch(ProfileActions.loadProfile());

      // Get User Notifications
      this.store.dispatch(
        NotificationActions.getUserNotifications({
          pageInfo: { limit: 15, offset: 0 },
        })
      );
      // Get User Chats
      this.store.dispatch(
        MessagesActions.getChats({
          pagination: { limit: 15, offset: 0 },
        })
      );
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
