import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperWizardComponent } from './stepper-wizard.component';

xdescribe('StepperWizardComponent', () => {
  let component: StepperWizardComponent;
  let fixture: ComponentFixture<StepperWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
