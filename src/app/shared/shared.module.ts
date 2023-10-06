import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { IntlTelInputDirective } from './directives/intl-tel-input.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OnlyAllowDirective } from './directives/only-allow.directive';
import { DialogTitleDirective } from './directives/dialog/dialog-title.directive';
import { DialogButtonsDirective } from './directives/dialog/dialog-buttons.directive';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { DialogComponentOutletComponent } from './components/modal-dialog/dialog-component-outlet.component';
import { ConnectFormDirective } from './directives/connect-form/connect-form.directive';
import { DropZoneDirective } from './directives/dropzone/drop-zone.directive';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ModalLoaderComponent } from './components/modal-loader/modal-loader.component';
import { TextareaAutoresizeDirective } from './directives/textarea-autoresize/textarea-autoresize.directive';
import { FocusDirective } from './directives/focus-textarea/focus.directive';
import { DateAgoPipe } from './pipes/date-ago/date-ago.pipe';
import { HightlightPipe } from './pipes/hightlight/hightlight.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html/sanitize-html.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormatCardNumberMaskPipe } from './directives/format-card-number-mask/format-card-number-mask.pipe';
import { TruncateTextDirective } from './directives/truncate-text/truncate-text.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocalizedDatePipe } from './pipes/localized-pipe/localized-pipe.pipe';
import { NoMoneyAlertComponent } from './components/no-money-alert/no-money-alert.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StepperWizardComponent } from './components/stepper-wizard/stepper-wizard.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmationForPaymentComponent } from './components/confirmation-for-payment/confirmation-for-payment.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { I18nFieldPipe } from './pipes/I18n-field/i18n-field.pipe';

const SHARED_COMPONENTS = [
  // Directives
  TruncateTextDirective,
  IntlTelInputDirective,
  OnlyAllowDirective,
  DialogTitleDirective,
  DialogButtonsDirective,
  ConnectFormDirective,
  TextareaAutoresizeDirective,
  FocusDirective,
  DropZoneDirective,
  // Pipes
  DateAgoPipe,
  HightlightPipe,
  FormatCardNumberMaskPipe,
  LocalizedDatePipe,
  SanitizeHtmlPipe,
  I18nFieldPipe,
  // Utils Components
  SplashScreenComponent,
  NotificationComponent,
  SearchFiltersComponent,
  DialogComponentOutletComponent,
  ModalDialogComponent,
  ModalLoaderComponent,
  NoMoneyAlertComponent,
  StepperWizardComponent,
  ConfirmationForPaymentComponent,
];
const IMPORTS = [
  CommonModule,
  OverlayModule,
  FontAwesomeModule,
  TranslateModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  LoaderComponent,
  CdkTreeModule,
  CdkMenuModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatTabsModule,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
  NgxSkeletonLoaderModule,
];
@NgModule({
  /*DECLARE REUSABLE COMPONENTS*/
  declarations: SHARED_COMPONENTS,
  imports: [...IMPORTS],
  /*EXPORT REUSABLE COMPONENTS*/
  exports: [...SHARED_COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  /*NO PROVIDERS HERE*/
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        /*ALL SERVICES THAT MODULE NEEDS!!*/
        TranslatePipe,
        CurrencyPipe,
        LocalizedDatePipe,
      ],
    };
  }
}
