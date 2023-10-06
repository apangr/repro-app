import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tf-error-400',
  templateUrl: './error-400.component.html',
  styleUrls: ['./error-400.component.scss'],
})
export class Error400Component {
  arrowBack = faLongArrowAltLeft;
  constructor(public location: Location) {}
}
