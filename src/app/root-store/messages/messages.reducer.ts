import { createReducer, on } from '@ngrx/store';
import { MessagesActions } from '.';

export interface MessagesState {
  chats: {
    loaded: boolean;
    error?: Error | any;
    conversations?: any[];
  };
  selectedChat: {
    loaded: boolean;
    error?: Error | any;
    chat?: any;
  };
  contacts: {
    loaded: boolean;
    error?: Error | any;
    users?: any[];
  };
}

export const initialState: MessagesState = {
  chats: {
    loaded: false,
  },
  selectedChat: {
    loaded: false,
  },
  contacts: {
    loaded: false,
  },
};

export const reducer = createReducer(
  initialState,
  on(MessagesActions.getChatByUserSuccess, (state, { chat }) => {
    return {
      ...state,
      selectedChat: {
        loaded: true,
        chat,
      },
    };
  }),
  on(MessagesActions.getChatByUserFail, (state, { error }) => {
    return {
      ...state,
      selectedChat: {
        ...state.selectedChat,
        error,
      },
    };
  }),
  on(
    MessagesActions.sendMessageSuccess,
    MessagesActions.addReceiverMessage,
    (state, { message }) => {
      return {
        ...state,
        selectedChat: {
          loaded: true,
          chat: {
            ...state.selectedChat.chat,
            messages: state.selectedChat.chat?.messages
              ? [...(state.selectedChat.chat?.messages || []), message]
              : [message],
          },
        },
      };
    }
  ),
  on(MessagesActions.sendMessageFail, (state, { error }) => {
    return {
      ...state,
      selectedChat: {
        ...state.selectedChat,
        error,
      },
    };
  }),
  on(MessagesActions.getChatsSuccess, (state, { conversations }) => {
    return {
      ...state,
      chats: {
        loaded: true,
        conversations,
      },
    };
  }),
  on(MessagesActions.getChatsFail, (state, { error }) => {
    return {
      ...state,
      chats: {
        ...state.chats,
        error,
      },
    };
  }),
  on(MessagesActions.getContactsSuccess, (state, { users }) => {
    return {
      ...state,
      contacts: {
        loaded: true,
        users,
      },
    };
  }),
  on(MessagesActions.getContactsFail, (state, { error }) => {
    return {
      ...state,
      contacts: {
        ...state.contacts,
        error,
      },
    };
  }),
  on(MessagesActions.readMessagesSuccess, (state, { ownerId }) => {
    return {
      ...state,
      chats: {
        ...state.chats,
        conversations: state.chats.conversations
          ? [
              ...state.chats.conversations.map((item) => {
                const chat = state.chats.conversations?.find(
                  (item) => item.contact?.id === ownerId
                );
                if (chat && item.contact?.id === chat.contact?.id) {
                  return {
                    ...item,
                    unreadCount: 0,
                  };
                } else {
                  return item;
                }
              }),
            ]
          : state.chats.conversations,
      },
    };
  }),
  on(MessagesActions.removeSelecteChat, (state) => ({
    ...state,
    selectedChat: {
      chat: undefined,
      loaded: false,
    },
  }))
);
