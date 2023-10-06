import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { UserNotificationsState } from './notifications.reducer';

const userNotificationsState = (state: AppState) =>
  state.userNotificationsState;

// All Notifications
export const selectNotifications = createSelector(
  userNotificationsState,
  (state: UserNotificationsState) => state.userNotifications
);
// Notification By Id
export const selectNotificationById = (id: string) =>
  createSelector(selectNotifications, (notification) =>
    notification.find((item) => item.id === id)
  );
// New Notifications
export const selectNewNotificationsNumber = createSelector(
  userNotificationsState,
  (state: UserNotificationsState) =>
    state.userNotifications.filter((item) => !item.view).length
);
