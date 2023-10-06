import { Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_PREFIX,
  REFRESH_TOKEN_PREFIX,
} from '@app/core/models/local-storage.models';
import {
  LocalStorageItem,
  LocalStorageService,
} from '@app/core/services/local-storage.service';
import { of } from 'rxjs';

@Injectable()
export class JwtService {
  constructor(private storageService: LocalStorageService) {}

  public saveTokens(tokens: {
    accessToken: string;
    refreshToken: string;
  }): void {
    const access_token: LocalStorageItem = {
      key: ACCESS_TOKEN_PREFIX,
      value: tokens.accessToken,
    };
    const refresh_token: LocalStorageItem = {
      key: REFRESH_TOKEN_PREFIX,
      value: tokens.refreshToken,
    };
    this.storageService.setItem(access_token);
    this.storageService.setItem(refresh_token);
  }

  public removeTokens(): void {
    this.storageService.removeItem(ACCESS_TOKEN_PREFIX);
    this.storageService.removeItem(REFRESH_TOKEN_PREFIX);
  }

  getAccessToken(): string {
    return this.storageService.getItem(ACCESS_TOKEN_PREFIX) as string;
  }
  getRefreshToken(): string {
    return this.storageService.getItem(REFRESH_TOKEN_PREFIX) as string;
  }

  public isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(window.atob(token.split('.')[1])).exp;
    return Date.now() >= expiry * 1000;
  }

  public refreshToken(refresh_token: string) {
    return of();
  }

  public getUser(): any | null {
    const token = this.storageService.getItem(ACCESS_TOKEN_PREFIX);
    if (token) {
      const userData = window.atob(token.split('.')[1]);
      return JSON.parse(userData);
    }
    return null;
  }
}
