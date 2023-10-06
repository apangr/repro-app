import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@app/core/models/modal.types';
import { AuthService } from '@app/core/services/auth.service';
import { I18nService } from '@app/core/services/i18n.service';
import { notNullOrUndefined } from '@app/core/utils/not-null-or-undefined';
import { AppState, ProfileActions, ProfileSelectors } from '@app/root-store';
import { environment } from '@env/environment';
import {
  faChevronLeft,
  faChevronRight,
  faMoneyCheckDollar,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { SettingsInstaceType } from '../../models/settings-menu.enum';

@Component({
  selector: 'tf-profile-settings-menu',
  templateUrl: './profile-settings-menu.component.html',
  styleUrls: ['./profile-settings-menu.component.scss'],
})
export class ProfileSettingsMenuComponent
  implements Dialog, OnInit, OnDestroy, AfterViewInit
{
  resolveWith: (result?: any) => void;
  navArrowRigthIcon = faChevronRight;
  navArrowLeftIcon = faChevronLeft;
  logOutIcon = faSignOutAlt;
  moneyIcon = faMoneyCheckDollar;
  profileData: any;
  profile$ = this.store.select(ProfileSelectors.selectProfile);
  allLangs = environment.supportedLanguages;
  defaultSettingType: SettingsInstaceType = SettingsInstaceType.ROUTE;
  SettingsInstaceType = SettingsInstaceType;
  _unsubscribe = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activedRoute: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
    private readonly i18nService: I18nService,
    private readonly elementRef: ElementRef
  ) {}
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
  ngOnInit(): void {
    this.profile$
      .pipe(takeUntil(this._unsubscribe), filter(notNullOrUndefined))
      .subscribe((profile) => {
        this.profileData = profile;
      });
  }

  ngAfterViewInit(): void {
    const links = this.elementRef.nativeElement.querySelectorAll('li');
    links.forEach((element: any) => {
      element.addEventListener('click', () => {
        if (this.defaultSettingType === SettingsInstaceType.MODAL) {
          this.resolveWith();
        }
      });
    });
  }

  onLogOut() {
    this.store.dispatch(ProfileActions.logout());
  }

  onSelectLanguage(lang: string) {
    this.i18nService.language = lang;
    const langCode = lang.split('-');
    this.store.dispatch(
      ProfileActions.changeLanguage({
        id: this.profileData._id,
        update: {
          langCode: langCode[0],
        },
      })
    );
  }

  onMenuItemNavigate(url: string) {
    if (this.defaultSettingType === SettingsInstaceType.MODAL) {
      this.router.navigate([`settings/${url}`]);
      this.resolveWith();
    }
    if (this.defaultSettingType === SettingsInstaceType.ROUTE)
      this.router.navigate([url], { relativeTo: this.activedRoute });
  }
}
