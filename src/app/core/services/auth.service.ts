import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { notNullOrUndefined } from '../utils/not-null-or-undefined';
import { LocalStorageService } from './local-storage.service';
import {
  ACCESS_TOKEN_PREFIX,
  REFRESH_TOKEN_PREFIX,
} from '../models/local-storage.models';
import { Router } from '@angular/router';
import { AppState, ProfileSelectors } from '@app/root-store';
import { select, Store } from '@ngrx/store';

// const log = new Logger('AuthService');
@Injectable()
export class AuthService {
  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private readonly store: Store<AppState>
  ) {}

  userLogin(logindata: { identifier: string; password: string }) {
    return of();
  }

  validateIdentifier(body: { identifier: string }) {
    return of();
  }

  validateIdentifierByCode(body: { identifier: string; code: string }) {
    return of();
  }

  signUp(body: { input: any }) {
    return of();
  }

  get isLoggedIn(): boolean {
    const authToken = this.storageService.getItem(ACCESS_TOKEN_PREFIX);
    return authToken ? true : false;
  }

  isCreator(): Observable<any> {
    return of();
  }

  getCreatorData(): Observable<any | null> {
    return this.store.pipe(select(ProfileSelectors.selectUserCreatorData));
  }

  doLogout() {
    this.storageService.removeItem(ACCESS_TOKEN_PREFIX);
    this.storageService.removeItem(REFRESH_TOKEN_PREFIX);
    this.router.navigate(['auth/sign-up']);
  }

  resetPasswordBySMS(body: { phone: string }) {
    return of();
  }

  smsCodeToResetPassword(body: { phone: string; code: string }) {
    return of();
  }

  resetPassword(body: { newPassword: string }) {
    return of();
  }

  get isContentCreator(): Observable<any> {
    return of();
  }
}
