import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './views/+shell/shell.module';
import { CoreModule } from './core/core.module';
import { RootStoreModule } from './root-store';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShellModule,
    CoreModule,
    RootStoreModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
