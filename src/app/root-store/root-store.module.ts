import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './profile-store/profile.effects';
import { ProfileReducer } from './profile-store';
import { GlobalLoadingReducer } from './global-loading';
import { SearchReducer } from './search';
import { SearchEffects } from './search/search.effects';
import { NotificationEffects } from './notifications-store/notifications.effects';
import { NotificationReducer } from './notifications-store';
import { MessagesEffects } from './messages/messages.effects';
import { MessagesReducer } from './messages';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      profile: ProfileReducer,
      globalLoading: GlobalLoadingReducer,
      searchState: SearchReducer,
      userNotificationsState: NotificationReducer,
      messagesState: MessagesReducer,
    }),
    EffectsModule.forRoot([
      ProfileEffects,
      SearchEffects,
      NotificationEffects,
      MessagesEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class RootStoreModule {}
