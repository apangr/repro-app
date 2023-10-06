import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, PROFILE_FEATURE_KEY } from './profile.reducer';

// Lookup the 'Profile' feature state managed by NgRx
const getProfileState = createFeatureSelector<State>(PROFILE_FEATURE_KEY);

// select the Profile
export const selectProfile = createSelector(
  getProfileState,
  (state: State) => state.profile
);
export const selectUserProfileId = createSelector(
  getProfileState,
  (state: State) => state.profile?._id
);

// select profile loaded flag
export const selectProfileLoaded = createSelector(
  getProfileState,
  (state) => state.loaded
);

// select profile error
export const selectError = createSelector(
  getProfileState,
  (state) => state.error
);

// user post labels
export const selectUserPostLabels = createSelector(
  getProfileState,
  (state) => state.userPostLabels.labels
);

export const selectUserPostLabelsLoading = createSelector(
  getProfileState,
  (state) => state.userPostLabels.loading
);

export const selectUserPostLabelsError = createSelector(
  getProfileState,
  (state) => state.userPostLabels.error
);

// Select profile creator data
export const selectUserCreatorData = createSelector(
  getProfileState,
  (state) => state.creatorData.creator
);

export const selectUserCreatorId = createSelector(
  getProfileState,
  (state) => state.creatorData.creator?.id
);

export const selectCreatorUserId = createSelector(
  getProfileState,
  (state) => state.creatorData.creator?.user
);

export const selectCreatorSubscriptionPrice = createSelector(
  getProfileState,
  (state) => state.creatorData.creator?.baseSubscriptionPrice
);

export const selectUserProfileRoles = createSelector(
  getProfileState,
  (state) => state.profile?.roles
);

export const selectActiveStreamingPlan = createSelector(
  getProfileState,
  (state) => state.creatorData.activePlan
);

export const selectActiveStreamingPlanIsAnnual = createSelector(
  getProfileState,
  (state) => state.creatorData.isAnnual
);

// Select Profile Configuration
export const selectProfileConfig = createSelector(
  getProfileState,
  (state) => state.profileConfig
);
