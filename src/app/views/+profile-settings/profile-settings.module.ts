import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalRedirectInfoComponent } from './components/modal-redirect-info/modal-redirect-info.component';
import { HelpSupportComponent } from './pages/help-support/help-support.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileSettingsMenuComponent } from './components/profile-settings-menu/profile-settings-menu.component';

@NgModule({
  declarations: [
    ProfileSettingsComponent,
    EditProfileComponent,
    ModalRedirectInfoComponent,
    HelpSupportComponent,
    ProfileSettingsMenuComponent,
  ],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    FontAwesomeModule,
    NgApexchartsModule,
    PageHeaderComponent,
    MatDividerModule,
    MatRadioModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
  ],
})
export class ProfileSettingsModule {}
