import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const messagesState = (state: AppState) => state.messagesState;

// Select Active Chat
export const selectActiveChat = createSelector(
  messagesState,
  (state) => state.selectedChat.chat
);

// Select All Chats
export const selectAllChats = createSelector(
  messagesState,
  (state) => state.chats.conversations
);

// Select Contacts
export const selectContacts = createSelector(
  messagesState,
  (state) => state.contacts.users
);

// Select Unread Messages Number
export const selectUnreadMessagesNumber = createSelector(
  messagesState,
  (state) => state.chats.conversations
);

// Select Active Chat Messages
export const selectActiveChatMessages = createSelector(
  messagesState,
  (state) => {
    if (state.selectedChat.chat && state.selectedChat.chat.messages) {
      return state.selectedChat.chat?.messages
        .filter((item: any) => !item.isMine)
        .map((ele: any) => ele.id!);
    }
    return null;
  }
);
