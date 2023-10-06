import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dialog } from '@app/core/models/modal.types';

@Component({
  selector: 'tf-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent implements Dialog, OnInit {
  resolveWith: (result?: any) => void;
  filtersForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      all: true,
      most_popular: false,
      follow: false,
      label: false,
      close_to_me: false,
    });
  }

  onAllChange() {
    Object.keys(this.filtersForm.controls).forEach((item) => {
      if (item != 'all') {
        if (this.filtersForm.get(item)?.value) {
          this.filtersForm.get(item)?.setValue(false);
        }
      }
    });
  }

  onOptionChange() {
    this.filtersForm.get('all')?.setValue(false);
  }

  onClearFilters() {
    Object.keys(this.filtersForm.controls).forEach((item) => {
      if (item === 'all' && !this.filtersForm.get(item)?.value) {
        this.filtersForm.get(item)?.setValue(true);
      }
      if (item !== 'all' && this.filtersForm.get(item)?.value) {
        this.filtersForm.get(item)?.setValue(false);
      }
    });
  }

  onSubmit() {
    this.resolveWith(this.filtersForm.value);
  }
}
