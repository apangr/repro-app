import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import intlTelInput from 'intl-tel-input';

/**
 * Directive based on International Telephone Input javascript plugin.
 * See https://intl-tel-input.com/ and https://github.com/jackocnr/intl-tel-input
 */
@Directive({
  selector: '[tfIntlTelInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IntlTelInputDirective,
      multi: true,
    },
  ],
})
export class IntlTelInputDirective
  implements AfterViewInit, Validator, OnDestroy
{
  iti!: any;
  inputEle!: Element | null;
  errorEle = document.createElement('span');
  errorMap = [
    'IS_POSSIBLE', //'Invalid number
    'INVALID_COUNTRY_CODE', //'Invalid country calling code'
    'TOO_SHORT', //'The string supplied is too short to be a phone number'
    'TOO LONG', //'The string supplied is too long to be a phone number'
    'IS_POSSIBLE_ONLY', //'Invalid number'
    'INVALID_LENGTH', //'Invalid length'
    'INVALID_VALUE', //'Invalid value(NaN)'
  ];
  @Output() coutryData: EventEmitter<any> = new EventEmitter<any>();
  @Input() allowSelectCountry = false;
  @Input() separateDialCode = false;
  /**
   * '' empty string, init with the first country in the default list
   *
   * 'auto' will lookup the user's country based
   * on their IP address (requires the geoIpLookup option)
   *
   */
  @Input() initialCountry: '' | 'auto' = '';

  constructor(private eleRef: ElementRef) {}

  ngOnDestroy(): void {
    this.iti.destroy();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initIntlTelInput();
      const int = document.getElementsByClassName('iti');
      this.inputEle = int.item(0);
      this.errorEle.style.display = 'none';
      this.inputEle?.insertAdjacentElement('afterend', this.errorEle);
    });
    // listen to the telephone input for changes
    this.inputEle?.addEventListener('countrychange', () => {
      this.coutryData.emit(this.iti?.getSelectedCountryData());
    });
  }

  /**
   * Initialize plugins options
   */
  private initIntlTelInput(): void {
    this.iti = intlTelInput(this.eleRef.nativeElement, {
      separateDialCode: this.separateDialCode,
      allowDropdown: this.allowSelectCountry,
      initialCountry: this.initialCountry,
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js',
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.iti && control.value) this.iti.setNumber(control.value);
    this.coutryData.emit(this.iti?.getSelectedCountryData());
    return this.fieldValueValidate()(control);
  }

  fieldValueValidate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.iti) {
        if (isNaN(this.iti.getNumber()) || this.iti.getNumber().length <= 3) {
          // if (this.iti.getNumber().length <= 3) {
          return { phoneError: this.errorMap[6] };
        }
        if (!this.iti.isValidNumber() && !isNaN(this.iti.getNumber())) {
          // if (!this.iti.isValidNumber()) {
          const errorCode = this.iti.getValidationError();
          return { phoneError: this.errorMap[errorCode] };
        }
      }
      return null;
    };
  }
}
