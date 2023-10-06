import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'tf-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class PageHeaderComponent {
  navArrowLeftIcon = faChevronLeft;

  @Input() title: string;
  @Input() showBack = false;

  constructor(private readonly location: Location) {}

  goBack() {
    this.location.back();
  }
}
