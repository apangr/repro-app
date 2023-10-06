import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { ModalService } from '@app/core/services/modal.service';
import { NotificationService } from '@app/core/services/notification.service';
import { AppState, ProfileSelectors } from '@app/root-store';
import {
  MessagesActions,
  selectUnreadMessagesNumber,
} from '@app/root-store/messages';
import { selectNewNotificationsNumber } from '@app/root-store/notifications-store';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ProfileSettingsMenuComponent } from '@app/views/+profile-settings/components/profile-settings-menu/profile-settings-menu.component';
import { SettingsInstaceType } from '@app/views/+profile-settings/models/settings-menu.enum';
@Component({
  selector: 'tf-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuSidebarComponent implements OnInit, OnDestroy {
  profile$ = this.store.select(ProfileSelectors.selectProfile);
  profile: any;
  notificationNumber: number;
  notificationBadgeHidden = false;
  messagesNumber: number | undefined;
  messagesNumberHidden = false;
  _unsubscribe = new Subject<void>();
  logoSrc = 'assets/fanatyx-logo.svg';
  logoDarkSrc = 'assets/fanatyx-logo-white.svg';
  settingsInstanceType = SettingsInstaceType.ROUTE;
  createSettingsMenu = {
    modal: () => {
      this.openSettingsAsModal();
    },
    route: () => {
      this.router.navigate(['/settings']);
    },
  };

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<AppState>,
    private _breakpointObserver: BreakpointObserver
  ) {
    this._breakpointObserver
      .observe('(max-width: 1159px)')
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((result) => {
        if (result.matches) {
          // Redefine Menu Sidebar Logo
          this.logoSrc = 'assets/fanatyx-icon.svg';
          this.logoDarkSrc = 'assets/fanatyx-icon.svg';
          this.settingsInstanceType = SettingsInstaceType.MODAL;
        } else {
          this.logoSrc = 'assets/fanatyx-logo.svg';
          this.logoDarkSrc = 'assets/fanatyx-logo-white.svg';
          this.settingsInstanceType = SettingsInstaceType.ROUTE;
        }
      });
  }
  ngOnInit(): void {
    // Select Profile
    this.store
      .pipe(
        takeUntil(this._unsubscribe),
        select(ProfileSelectors.selectProfile)
      )
      .subscribe((data) => {
        if (data) {
          this.profile = data;
        }
      });
    // Select Pending Notifications Number
    this.store
      .pipe(takeUntil(this._unsubscribe), select(selectNewNotificationsNumber))
      .subscribe((data) => {
        this.notificationNumber = data;
        if (this.notificationNumber > 0) {
          this.notificationBadgeHidden = false;
        } else {
          this.notificationBadgeHidden = true;
        }
      });
    // Select Unread Messages Number
    this.store
      .pipe(takeUntil(this._unsubscribe), select(selectUnreadMessagesNumber))
      .subscribe((data) => {
        this.messagesNumber = data?.reduce(
          (total, obj) => total + (obj.unreadCount ? obj.unreadCount : 0),
          0
        );

        if (this.messagesNumber && this.messagesNumber > 0) {
          this.messagesNumberHidden = false;
        } else {
          this.messagesNumberHidden = true;
        }
      });
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  /**
   * Open Settings Menu in a Dialog
   * ? Use for small screens
   */
  openSettingsAsModal(): void {
    this.modalService
      .fromComponent(ProfileSettingsMenuComponent, {
        closable: true,
        locals: {
          defaultSettingType: SettingsInstaceType.MODAL,
        },
      })
      .subscribe();
  }

  openSettingMenu() {
    if (this.settingsInstanceType === SettingsInstaceType.MODAL) {
      this.createSettingsMenu['modal']();
    }
    if (this.settingsInstanceType === SettingsInstaceType.ROUTE) {
      this.createSettingsMenu['route']();
    }
  }

  openNewPostModal(): void {}
}
