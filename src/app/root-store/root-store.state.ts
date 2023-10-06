import { GlobalLoadingState } from './global-loading';

import { ProfileState } from './profile-store';

import { SearchState } from './search';

import { UserNotificationsState } from './notifications-store';
import { MessagesState } from './messages';
export interface State {
  profile: ProfileState;
  globalLoading: GlobalLoadingState;
  searchState: SearchState;
  userNotificationsState: UserNotificationsState;
  messagesState: MessagesState;
}
