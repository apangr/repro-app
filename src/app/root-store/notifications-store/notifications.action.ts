import { createAction, props } from '@ngrx/store';
import { PageInfo } from '@app/shared/models/page.interface';
import { UserNotification } from '@app/views/+shell/pages/+notifications/services/notification.models';

// Get User Notifications
export const getUserNotifications = createAction(
  '[Notifications] Get User Notifications',
  props<{ pageInfo: PageInfo }>()
);
export const getUserNotificationsSuccess = createAction(
  '[Notifications] Get User Notifications Success',
  props<{ notifications: UserNotification[] }>()
);
export const getUserNotificationsFail = createAction(
  '[Notifications] Get User Notifications Fail',
  props<{ error: string }>()
);
// Add Notification
export const addNotification = createAction(
  '[Notifications] Add Notification',
  props<{ notification: UserNotification }>()
);
export const updateNotification = createAction(
  '[Notifications] Update Notification',
  props<{ notification: UserNotification }>()
);
// Accept Referral Request
export const acceptReferralRequest = createAction(
  '[Notifications] Accept Referral Request',
  props<{ notification: UserNotification }>()
);
export const acceptReferralRequestSuccess = createAction(
  '[Notifications] Accept Referral Request Success',
  props<{ notification: UserNotification }>()
);
export const acceptReferralRequestFail = createAction(
  '[Notifications] Accept Referral Request Fail',
  props<{ error: string }>()
);
// Reject Referral Request
export const rejectReferralRequest = createAction(
  '[Notifications] Reject Referral Request',
  props<{ notification: UserNotification }>()
);
export const rejectReferralRequestSuccess = createAction(
  '[Notifications] Reject Referral Request Success',
  props<{ notification: UserNotification }>()
);
export const rejectReferralRequestFail = createAction(
  '[Notifications] Reject Referral Request Fail',
  props<{ error: string }>()
);
// Mark Notification as seen
export const markAsViewed = createAction(
  '[Notifications] Mark Notification as seen',
  props<{ notificationId: string }>()
);
export const markAsViewedSuccess = createAction(
  '[Notifications] Mark Notification as seen Success',
  props<{ notification: UserNotification }>()
);
export const markAsViewedFail = createAction(
  '[Notifications] Mark Notification as seen Fail',
  props<{ error: string }>()
);
