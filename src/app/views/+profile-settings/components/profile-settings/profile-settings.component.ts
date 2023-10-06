import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { I18nService } from '@app/core/services/i18n.service';
import { AppState, ProfileActions, ProfileSelectors } from '@app/root-store';
import { PageInfo } from '@app/shared/models/page.interface';
import { environment } from '@env/environment';
import {
  faChevronLeft,
  faChevronRight,
  faMoneyCheckDollar,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'tf-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  navArrowRigthIcon = faChevronRight;
  navArrowLeftIcon = faChevronLeft;
  logOutIcon = faSignOutAlt;
  moneyIcon = faMoneyCheckDollar;
  profile$ = this.store.select(ProfileSelectors.selectProfile);
  allLangs = environment.supportedLanguages;

  constructor(
    private authService: AuthService,
    private readonly store: Store<AppState>,
    private i18nService: I18nService
  ) {}
  ngOnInit(): void {
    // Get Profile Config
    this.store.dispatch(ProfileActions.getProfileConfig());
    // Get Creator Referrals
    const profile$ = this.store.select(ProfileSelectors.selectProfile);
    const pageInfo: PageInfo = {
      limit: 10,
      offset: 0,
    };
  }

  onLogOut() {
    this.store.dispatch(ProfileActions.logout());
  }

  onSelectLanguage(lang: string) {
    this.i18nService.language = lang;
  }
}
