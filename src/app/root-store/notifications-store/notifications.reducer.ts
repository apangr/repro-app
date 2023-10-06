import { UserNotification } from '@app/views/+shell/pages/+notifications/services/notification.models';
import { createReducer, on } from '@ngrx/store';
import { NotificationActions } from '.';

export interface UserNotificationsState {
  loaded: boolean;
  error?: Error | any;
  userNotifications: UserNotification[];
}

export const initialState: UserNotificationsState = {
  loaded: false,
  error: null,
  userNotifications: [],
};

export const reducer = createReducer(
  initialState,
  on(
    NotificationActions.getUserNotificationsSuccess,
    (state, { notifications }) => {
      return {
        ...state,
        loaded: true,
        userNotifications: [...notifications],
      };
    }
  ),
  on(NotificationActions.getUserNotificationsFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(
    NotificationActions.acceptReferralRequestSuccess,
    NotificationActions.rejectReferralRequestSuccess,
    NotificationActions.markAsViewedSuccess,
    (state, { notification }) => {
      return {
        ...state,
        userNotifications: state.userNotifications.map((item) => {
          if (item.id === notification.id) {
            return notification;
          } else {
            return item;
          }
        }),
      };
    }
  ),
  on(NotificationActions.addNotification, (state, { notification }) => {
    return {
      ...state,
      userNotifications: [notification, ...state.userNotifications],
    };
  }),
  on(NotificationActions.updateNotification, (state, { notification }) => {
    return {
      ...state,
      userNotifications: state.userNotifications.map((item) => {
        if (item.id === notification.id) {
          return notification;
        } else {
          return item;
        }
      }),
    };
  })
);
