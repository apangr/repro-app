import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRedirectInfoComponent } from './modal-redirect-info.component';

xdescribe('ModalRedirectInfoComponent', () => {
  let component: ModalRedirectInfoComponent;
  let fixture: ComponentFixture<ModalRedirectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRedirectInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRedirectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
