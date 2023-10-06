import { PageInfo } from '@app/shared/models/page.interface';
import { createAction, props } from '@ngrx/store';

// Get All Chats
export const getChats = createAction(
  '[Messages] Get Chats',
  props<{ pagination: PageInfo }>()
);
export const getChatsSuccess = createAction(
  '[Messages] Get Chats Success',
  props<{ conversations: any[] }>()
);
export const getChatsFail = createAction(
  '[Messages] Get Chats Fail',
  props<{ error: string }>()
);
// Get Chat By User Id
export const getChatByUser = createAction(
  '[Messages] Get Chat By User',
  props<{ userId: string; pagination: PageInfo; myUserId: string }>()
);
export const getChatByUserSuccess = createAction(
  '[Messages] Get Chat By User Success',
  props<{ chat: any }>()
);
export const getChatByUserFail = createAction(
  '[Messages] Get Chats Fail',
  props<{ error: string }>()
);

export const addReceiverMessage = createAction(
  '[Messages] Add Receiver Message',
  props<{ message: any }>()
);

// Send Message
export const sendMessage = createAction(
  '[Messages] Send Message',
  props<{
    text: string;
    user: string;
    messageType: any;
    myUserId: string;
  }>()
);
export const sendMessageSuccess = createAction(
  '[Messages] Send Message Success',
  props<{ message: any }>()
);
export const sendMessageFail = createAction(
  '[Messages] Send Message Fail',
  props<{ error: string }>()
);

// Get Contacts
export const getContacts = createAction(
  '[Messages] Get Contacts',
  props<{ pagination: PageInfo }>()
);
export const getContactsSuccess = createAction(
  '[Messages] Get Contacts Success',
  props<{ users: any[] }>()
);
export const getContactsFail = createAction(
  '[Messages] Get Contacts Fail',
  props<{ error: string }>()
);

// Read Messages
export const readMessages = createAction(
  '[Messages] Read Messages',
  props<{ ownerId: string; messagesIds: string[] }>()
);
export const readMessagesSuccess = createAction(
  '[Messages] Read Messages Success',
  props<{ ownerId: string }>()
);
export const readMessagesFail = createAction(
  '[Messages] Read Messages Fail',
  props<{ error: string }>()
);

// Select Message
export const removeSelecteChat = createAction(
  '[Messages] Remove select Message as Active'
);
