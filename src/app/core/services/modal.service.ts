import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { Observable, race, finalize, map, take  } from 'rxjs';

import { ModalDialogComponent } from '@app/shared/components/modal-dialog/modal-dialog.component';

import {
  Dialog,
  DIALOG_COMPONENT,
  MODAL_OPTIONS,
  ModalOptions,
} from '@app/core/models/modal.types';

/**
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 */
@Injectable()
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Create a modal from a component. The component must implement the {@link Dialog} interface.
   * Additionally, the component should include templates for the title and the buttons to be
   * displayed in the modal dialog. See example:
   *
   * @example
   * ```
   * class MyDialog implements Dialog {
   *  resolveWith: (result?: any) => void;
   *
   *  okay() {
   *    doSomeWork().subscribe(result => {
   *      this.resolveWith(result);
   *    })
   *  }
   *
   *  cancel() {
   *    this.resolveWith(false);
   *  }
   * }
   * ```
   *
   * ```
   * <ng-template tfDialogTitle>Title of the modal</ng-template>
   *
   * <p>
   *     My Content
   * </p>
   *
   * <ng-template tfDialogButtons>
   *     <button type="button"
   *             class="btn"
   *             (click)="cancel()">Cancel</button>
   *     <button type="button"
   *             class="btn btn-primary"
   *             (click)="okay()">Okay</button>
   * </ng-template>
   * ```
   */
  fromComponent<T extends Dialog<any>, R>(
    component: Type<T> & Type<Dialog<R>>,
    options?: ModalOptions<T>
  ): Observable<R | undefined> {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const overlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy,
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'backdrop-color',
      })
    );

    const portal = new ComponentPortal(
      ModalDialogComponent,
      null,
      this.createInjector(component, options)
    );
    const modal = overlayRef.attach(portal);
    setTimeout(() => modal.changeDetectorRef.markForCheck());

    const close$ = new Observable<R>((subscriber) => {
      modal.instance.closeModal = (result: R) => {
        subscriber.next(result);
        subscriber.complete();
      };
    });

    // Close dialog if click the backdrop
    if (options?.closableWithBackDropClick) {
      const backdropClick$ = overlayRef
        .backdropClick()
        .pipe(map(() => undefined));

      return race<any>(close$, backdropClick$).pipe(
        take(1),
        finalize(() => overlayRef.dispose())
      );
    }

    return race<any>(close$).pipe(
      take(1),
      finalize(() => overlayRef.dispose())
    );
  }

  private createInjector<T, R>(
    component: Type<T> & Type<Dialog<R>>,
    options?: ModalOptions<T>
  ): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: DIALOG_COMPONENT, useValue: component },
        { provide: MODAL_OPTIONS, useValue: options },
      ],
    });
  }
}
