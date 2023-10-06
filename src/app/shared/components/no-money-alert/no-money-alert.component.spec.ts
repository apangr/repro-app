import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMoneyAlertComponent } from './no-money-alert.component';

describe('NoMoneyAlertComponent', () => {
  let component: NoMoneyAlertComponent;
  let fixture: ComponentFixture<NoMoneyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoMoneyAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoMoneyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
