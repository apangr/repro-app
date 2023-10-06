import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { SubscribeModalComponent } from '@app/shared/components/subscribe-modal/subscribe-modal.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    TranslateModule,
    SharedModule,
    SubscribeModalComponent,
    InfiniteScrollModule,
  ],
})
export class ProfileModule {}
