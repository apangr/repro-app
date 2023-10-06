import { createAction, props } from '@ngrx/store';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profile',
  LoadProfileSuccess = '[Profile] Load Profile Success',
  LoadProfileFail = '[Profile] Load Pofile Fail',
  UpdateProfile = '[Profile] Update Profile',
  UpdateProfileSuccess = '[Profile] Update Profile Success',
  UpdateProfileFail = '[Profile] Update Profile Fail',
  UploadNewImage = '[Profile] Upload New Image',
  UploadImage = '[Profile] Upload Image to S3',
  UploadImageSucces = '[Profile] Upload Image to S3 Success',
  UploadImageFail = '[Profile] Upload Image to S3 Fail',
  UpdateProfileAvatarImage = '[Profile Avatar] Update Profile Avatar Image',
  UpdateProfileAvatarImageSuccess = '[Profile Avatar] Update Profile Avatar Image Success',
  UpdateProfileAvatarImageFail = '[Profile Avatar] Update Profile Avatar Image Fail',
  UpdateProfileCoverImage = '[Profile Cover] Update Profile Cover Image',
  UpdateProfileCoverImageFail = '[Profile Cover] Update Profile Cover Image Fail',
  UploadCancel = '[File] Upload cancel',
  UploadReset = '[File] Upload reset',
  UploadStarted = '[File] Upload started',
  UploadProgress = '[File] Upload progress',
  UploadFailure = '[File] Upload failure',
  UploadCompleted = '[File] Upload completed',
}

//***** Load Profile Data *****/
export const loadProfile = createAction(ProfileActionTypes.LoadProfile);
export const loadProfileSuccess = createAction(
  ProfileActionTypes.LoadProfileSuccess,
  props<{ profile: any }>()
);
export const loadProfileFail = createAction(
  ProfileActionTypes.LoadProfileFail,
  props<{ error: Error | any }>()
);

//***** Load Profile Creator Data *****/
export const loadCreatorData = createAction(
  '[Creator] Load Creator Data',
  props<{ userId: string }>()
);
export const loadCreatorDataSuccess = createAction(
  '[Creator] Load Creator Data Success',
  props<{ creator: any }>()
);
export const loadCreatorDataFail = createAction(
  '[Creator] Load Creator Data Fail',
  props<{ error: string }>()
);
export const setPricePerMonth = createAction(
  '[Creator] Set Subscription Price',
  props<{ user: string; price: number }>()
);
export const setPricePerMonthSuccess = createAction(
  '[Creator] Set Subscription Price Success',
  props<{ baseSubscriptionPrice: number }>()
);
export const setPricePerMonthFail = createAction(
  '[Creator] Set Subscription Price Fail',
  props<{ error: string }>()
);

//***** Update Profile Cover/Avatar Images *****/
export const updateProfileAvatarImage = createAction(
  ProfileActionTypes.UpdateProfileAvatarImage,
  props<{ avatar: boolean; image: File }>()
);
export const updateProfileAvatarImageSuccess = createAction(
  ProfileActionTypes.UpdateProfileAvatarImageSuccess
);
export const updateProfileAvatarImageFail = createAction(
  ProfileActionTypes.UpdateProfileAvatarImageFail,
  props<{ error: Error | any }>()
);
export const updateProfileCoverImage = createAction(
  ProfileActionTypes.UpdateProfileCoverImage,
  props<{ cover: boolean; image: File }>()
);
export const updateProfileCoverImageFail = createAction(
  ProfileActionTypes.UpdateProfileCoverImageFail,
  props<{ error: Error | any }>()
);
export const uploadNewImage = createAction(
  ProfileActionTypes.UploadNewImage,
  props<{ message: string }>()
);

//***** Upload Image to S3 *****/
export const uploadImage = createAction(
  ProfileActionTypes.UploadImage,
  props<{ url: string; image: File }>()
);
export const uploadImageSuccess = createAction(
  ProfileActionTypes.UploadImageSucces
);
export const uploadImageFail = createAction(
  ProfileActionTypes.UploadImageFail,
  props<{ error: Error | any }>()
);

//***** Upload file progress *****/
export const uploadCancel = createAction(ProfileActionTypes.UploadCancel);

export const uploadReset = createAction(ProfileActionTypes.UploadReset);

export const uploadStarted = createAction(ProfileActionTypes.UploadStarted);

export const uploadProgress = createAction(
  ProfileActionTypes.UploadProgress,
  props<{ progress: number }>()
);

export const uploadFailure = createAction(
  ProfileActionTypes.UploadFailure,
  props<{ error: string }>()
);

export const uploadCompleted = createAction(ProfileActionTypes.UploadCompleted);

//***** Update Profile *****//
export const updateProfile = createAction(
  ProfileActionTypes.UpdateProfile,
  props<{ update: any; id: string }>()
);
export const updateProfileSuccess = createAction(
  ProfileActionTypes.UpdateProfileSuccess,
  props<{ profile: any }>()
);
export const updateProfileFail = createAction(
  ProfileActionTypes.UpdateProfileFail,
  props<{ error: Error | any }>()
);

//***** Change Language ******/
export const changeLanguage = createAction(
  '[Profile] Change Language',
  props<{ update: any; id: string }>()
);
export const changeLanguageSucces = createAction(
  '[Profile] Change Language Success'
);
export const changeLanguageFail = createAction(
  '[Profile] Change Language Fail',
  props<{ error: string }>()
);

//***** User post labels ******/
export const userPostLabels = createAction('[PostLabels] Get user post labels');
export const userPostLabelsSuccess = createAction(
  '[PostLabels] Get user post labels success',
  props<{ labels: any[] }>()
);
export const userPostLabelsFail = createAction(
  '[PostLabels] Get user post labels fail',
  props<{ error: string }>()
);

export const createNewPostLabel = createAction(
  '[PostLabels] Create new post label',
  props<{ label: string }>()
);
export const createNewPostLabelSuccess = createAction(
  '[PostLabels] Create new post label success',
  props<{ label: any }>()
);
export const createNewPostLabelFail = createAction(
  '[PostLabels] Create new post label fail',
  props<{ error: string }>()
);

//***** Become Creator ******/
export const createCreator = createAction(
  '[Become Creator] Create Creator',
  props<{ creator: any }>()
);
export const createCreatorSuccess = createAction(
  '[Become Creator] Create Creator Success',
  props<{ user: string }>()
);
export const createCreatorFail = createAction(
  '[Become Creator] Create Creator Fail',
  props<{ error: string }>()
);
export const navigateToVerificationService = createAction(
  '[Become Creator] Navigate to Verification Service',
  props<{ userId: string }>()
);
//***** Profile Config *****/
export const getProfileConfig = createAction(
  '[Profile Config] Get Profile Configuration'
);
export const getProfileConfigSuccess = createAction(
  '[Profile Config] Get Profile Configuration Success',
  props<{ profileConfig: any }>()
);
export const getProfileConfigFail = createAction(
  '[Profile Config] Get Profile Configuration Fail',
  props<{ error: string }>()
);
export const updateProfileConfig = createAction(
  '[Profile Config] Update Profile Config',
  props<{ updates: any }>()
);
export const updateProfileConfigSuccess = createAction(
  '[Profile Config] Update Profile Config Success',
  props<{ profileConfig: any }>()
);
export const updateProfileConfigFail = createAction(
  '[Profile Config] Update Profile Config Fail',
  props<{ error: string }>()
);

//***** Logout *****//
export const logout = createAction('[Profile] Do Logout');

//***** Delete User *****//
export const removeUser = createAction('[Profile] Remove User');
export const removeUserSuccess = createAction('[Profile] Remove User Success');
export const removeUserFail = createAction(
  '[Profile] Remove User Fail',
  props<{ error: string }>()
);

export const fromProfileActions = {
  loadProfile,
  loadProfileSuccess,
  loadProfileFail,
  updateProfile,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileAvatarImage,
  updateProfileCoverImage,
  updateProfileAvatarImageSuccess,
  updateProfileAvatarImageFail,
  updateProfileCoverImageFail,
  uploadNewImage,
  uploadImage,
  uploadImageSuccess,
  uploadImageFail,
  uploadCancel,
  uploadReset,
  uploadStarted,
  uploadProgress,
  uploadFailure,
  uploadCompleted,
};
