import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { AppState } from '@app/root-store';
import { TemplatePortal } from '@angular/cdk/portal';
import { selectShowGlobalLoading } from '@app/root-store/global-loading';

@Component({
  selector: 'tf-modal-loader',
  templateUrl: './modal-loader.component.html',
  styleUrls: ['./modal-loader.component.scss'],
})
export class ModalLoaderComponent implements OnInit {
  @ViewChild('leaderModal') leaderModal: TemplateRef<any>;
  private overlayRef: OverlayRef | null;

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectShowGlobalLoading)).subscribe((loading) => {
      if (loading) {
        this.openLoader();
      } else {
        this.closeLoader();
      }
    });
  }

  openLoader(): void {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.block();
    this.overlayRef = this.overlay.create({
      scrollStrategy,
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'backdrop-color',
    });

    const portal = new TemplatePortal(
      this.leaderModal,
      this.viewContainerRef,
      {}
    );

    this.overlayRef.attach(portal);
  }

  closeLoader(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
