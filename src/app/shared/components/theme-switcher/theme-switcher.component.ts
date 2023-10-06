import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'tf-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ThemeSwitcherComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn?.addEventListener('click', () => {
      // if set via local storage previously
      if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    });
  }
}
