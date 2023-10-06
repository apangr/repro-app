import { CdkStepper } from '@angular/cdk/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 'tf-stepper-wizard',
  templateUrl: './stepper-wizard.component.html',
  styleUrls: ['./stepper-wizard.component.scss'],
  // This custom stepper provides itself as CdkStepper so that it can be recognized
  // by other components.
  providers: [{ provide: CdkStepper, useExisting: StepperWizardComponent }],
})
export class StepperWizardComponent extends CdkStepper {}
