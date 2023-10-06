import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Dialog } from '@app/core/models/modal.types';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tf-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class SubscribeModalComponent implements Dialog, OnInit {
  cardIcon = faCreditCard;
  priceAmount: number;
  user: any;
  subscribePaidForm: FormGroup;
  resolveWith: (result?: any) => void;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.subscribePaidForm = this.fb.group({
      priceAmount: this.priceAmount + ' USD',
      paymentMethod: '',
    });
  }
}
