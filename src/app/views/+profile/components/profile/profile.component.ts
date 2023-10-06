import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '@app/root-store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  ProfileActions,
  ProfileSelectors,
} from '@app/root-store/profile-store';

@Component({
  selector: 'tf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  protected _unsubscribe = new Subject<void>();
  profile$ = this.store.select(ProfileSelectors.selectProfile);
  referralsCreators$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(ProfileActions.loadProfile());
  }

  ngOnInit(): void {
    this.loadUserReferrals();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private loadUserReferrals() {}
}
