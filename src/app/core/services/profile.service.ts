import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subscription } from 'rxjs';

@Injectable()
export class ProfileService {
  public querySubscription: Subscription;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get User Profile
   * @returns
   */
  getProfile() {
    return of();
  }

  updateProfile(body: any) {
    return of();
  }

  changeProfileCoverImage(body: { cover: boolean }) {
    return of();
  }

  changeProfileAvatarImage(body: { avatar: boolean }) {
    return of();
  }

  uploadImage(image: any, url: string, contentType: string) {
    const headers = { 'Content-Type': contentType };
    return this.httpClient.put<any>(url, image, {
      headers,
      reportProgress: true,
      observe: 'events',
    });
  }

  getProfileConfig() {
    return of();
  }
  setProfileConfig(body: any) {
    return of();
  }

  /**
   * Remove User
   */
  removeUser() {
    return of();
  }
}
