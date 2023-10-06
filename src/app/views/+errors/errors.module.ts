import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error500Component } from './error-500/error-500.component';
import { Error400Component } from './error-400/error-400.component';
import { ErrorsRoutingModule } from './error-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [Error500Component, Error400Component],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    TranslateModule,
    FontAwesomeModule,
  ],
})
export class ErrorsModule {}
