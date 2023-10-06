import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationForPaymentComponent } from './confirmation-for-payment.component';

describe('ConfirmationForPaymentComponent', () => {
  let component: ConfirmationForPaymentComponent;
  let fixture: ComponentFixture<ConfirmationForPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationForPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationForPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
