export interface UserNotification {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: string;
  text: string;
  textI18n?: string;
  type: any;
  view: boolean;
  profile: any;
}
