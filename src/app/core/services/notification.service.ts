import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { race, timer, finalize, take } from 'rxjs';
import { NotificationComponent } from '@app/shared/components/notification/notification.component';

import {
  NOTIFICATION_OPTIONS,
  NotificationOptions,
} from '@app/core/models/notification.types';

/**
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 */
@Injectable()
export class NotificationService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Display a "toast" notification.
   */
  notify(options: NotificationOptions) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .top('16px')
      .centerHorizontally();
    const scrollStrategy = this.overlay.scrollStrategies.noop();
    const overlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy,
        positionStrategy,
        hasBackdrop: false,
      })
    );
    const closeFn = () => {
      if (overlayRef.hasAttached()) {
        const notificationEl =
          overlayRef.overlayElement.querySelector('tf-notification');
        if (notificationEl) {
          notificationEl.classList.add('remove');
        }
        setTimeout(() => overlayRef.dispose(), 250);
      }
    };

    const portal = new ComponentPortal(
      NotificationComponent,
      null,
      this.createInjector(options, closeFn)
    );
    const notificationRef = overlayRef.attach(portal);

    return race<any>(
      notificationRef.instance.close,
      timer(options.duration)
    ).pipe(
      take(1),
      finalize(() => closeFn())
    );
  }

  error(message: string, title = 'error') {
    return this.notify({
      title,
      message,
      duration: 10000,
      type: 'error',
    });
  }

  success(message: string, title = 'success') {
    return this.notify({
      title,
      message,
      duration: 5000,
      type: 'error',
    });
  }

  info(message: string, title = 'information') {
    return this.notify({
      title,
      message,
      duration: 5000,
      type: 'info',
    });
  }

  private createInjector(
    options: NotificationOptions,
    closeFn: () => void
  ): Injector {
    options.templateContext = {
      ...options.templateContext,
      closeFn,
    };
    // const weakMap = new WeakMap<any, any>([[NOTIFICATION_OPTIONS, options]]);
    // return new PortalInjector(this.injector, weakMap);
    return Injector.create({
      parent: this.injector,
      providers: [{ provide: NOTIFICATION_OPTIONS, useValue: options }],
    });
  }
}
