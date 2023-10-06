import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ModalService } from '@app/core/services/modal.service';
import { ProfileService } from '@app/core/services/profile.service';
import { AppState, ProfileActions, ProfileSelectors } from '@app/root-store';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faCameraAlt,
  faChevronLeft,
  faChevronRight,
  faMoneyCheckDollar,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '@env/environment';
import { EMAIL_REGEX } from '@app/core/models/regexs';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { removeWhitespaces } from '@app/core/utils/utils';
@Component({
  selector: 'tf-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnDestroy {
  navArrowRigthIcon = faChevronRight;
  navArrowLeftIcon = faChevronLeft;
  trashIcon = faTrashAlt;
  cameraIcon = faCameraAlt;
  moneyIcon = faMoneyCheckDollar;
  logOutIcon = faSignOutAlt;
  _unsubscribe = new Subject<void>();
  profile!: any;
  profile$ = this.store.select(ProfileSelectors.selectProfile);
  profileForm!: FormGroup;
  completePhone: string;
  displayNameMaxLength = 25;
  bioMaxLength = 250;
  appUrl = environment.appUrl;
  EMAIL_REGEX = EMAIL_REGEX;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.getProfile();
    this.profileForm = this.fb.group({
      name: null,
      username: null,
      displayName: null,
      email: [null, Validators.pattern(EMAIL_REGEX)],
      phone: null,
      biography: null,
    });
  }

  getProfile() {
    this.store.dispatch(ProfileActions.loadProfile());
    this.profile$.pipe(takeUntil(this._unsubscribe)).subscribe({
      next: (profile) => (this.profile = profile),
      error: (err) => console.log('Upps a ocurrido un error', err),
    });
  }

  get username() {
    return this.profileForm.get('username');
  }
  get phone() {
    return this.profileForm.get('phone');
  }
  get email() {
    return this.profileForm.get('email');
  }

  goBack() {
    this.location.back();
  }

  onLogOut() {
    this.store.dispatch(ProfileActions.logout());
  }

  onChangeBannerImage() {}

  onChangeProfileImage() {}

  onDeleteProfileImage() {
    this.profileService
      .updateProfile({ avatar: false })
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.store.dispatch(ProfileActions.loadProfile()));
  }

  onDeleteBannerImage() {
    this.profileService
      .updateProfile({ cover: false })
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.store.dispatch(ProfileActions.loadProfile()));
  }

  /**
   * Concat control value with dialCode and emit it to wrapper component
   * @param event Event from int-tel-input directive
   */
  setCountryCode(event: any) {
    const dialCode = event?.dialCode;
    const phone_number_value: string = this.profileForm
      .get('phone')
      ?.value.replace(dialCode, '');
    let phone: string;
    if (dialCode && phone_number_value) {
      if (phone_number_value.startsWith('+')) {
        phone = phone_number_value.slice(1);
      } else {
        phone = phone_number_value;
      }
      this.completePhone = `+${dialCode}${phone}`;
    }
  }

  async onSubmitProfileForm() {
    if (this.profile) {
      this.store.dispatch(
        ProfileActions.updateProfile({
          update: {
            ...this.profileForm.value,
            phone: this.completePhone
              ? removeWhitespaces(this.completePhone)
              : removeWhitespaces(this.profileForm.get('phone')?.value),
          },
          id: this.profile._id,
        })
      );
    }
  }

  onDeleteAccount() {
    this.modalService
      .fromComponent(ConfirmationModalComponent, {
        locals: {
          isDelete: true,
          title: 'profile.deleteUser',
          description: 'profile.deleteUserMessage',
          cautionMessage: 'profile.deleteUserCautionMessage',
        },
      })
      .subscribe((confirmation) => {
        if (confirmation) this.store.dispatch(ProfileActions.removeUser());
        // TODO: Dispatch Delete User
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
