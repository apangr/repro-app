import {
  Notification as NotificationGQL,
  NotificationType as NotificationTypeGQL,
  UserFederationObjectType,
} from '@app/graphql/types';
import { mapUserFederationObjectTypeToCreatorProfile } from '@app/views/+profile-settings/services/creator.utils';
import { UserNotification, UserNotificationType } from './notification.models';

export function mapNotificationGQLToNotification(
  notification: NotificationGQL
): UserNotification {
  return {
    id: notification._id,
    text: notification.text,
    textI18n: notification.textI18n ? notification.textI18n : '',
    user: notification.user,
    view: notification.view ?? false,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
    profile: mapUserFederationObjectTypeToCreatorProfile(
      notification.profile as UserFederationObjectType
    ),
    type: mapNotificationTypeGQLToNotificationType(notification.type),
  };
}

export function mapNotificationTypeGQLToNotificationType(
  type: NotificationTypeGQL
): UserNotificationType {
  switch (type) {
    case NotificationTypeGQL.ReferralAccepted:
      return UserNotificationType.REFERRAL_ACCEPTED;
    case NotificationTypeGQL.ReferralAdd:
      return UserNotificationType.REFERRAL_ADD;
    case NotificationTypeGQL.ReferralRejected:
      return UserNotificationType.REFERRAL_REJECTED;
    case NotificationTypeGQL.ReferralRemove:
      return UserNotificationType.REFERRAL_REMOVE;
    case NotificationTypeGQL.ReferralUpdate:
      return UserNotificationType.REFERRAL_UPDATE;
    case NotificationTypeGQL.CreatorSetStatusApproved:
      return UserNotificationType.CREATOR_SET_STATUS_APPROVED;
    case NotificationTypeGQL.CreatorSetStatusCreated:
      return UserNotificationType.CREATOR_SET_STATUS_CREATED;
    case NotificationTypeGQL.CreatorSetStatusDeclined:
      return UserNotificationType.CREATOR_SET_STATUS_DECLINED;
    case NotificationTypeGQL.CreatorSetStatusFailed:
      return UserNotificationType.CREATOR_SET_STATUS_FAILED;
  }
}
