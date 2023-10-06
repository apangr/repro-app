import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { PageHeaderComponent } from '@app/views/+profile-settings/components/page-header/page-header.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NotificationsComponent, NotificationItemComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    PageHeaderComponent,
    TranslateModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class NotificationsModule {}
