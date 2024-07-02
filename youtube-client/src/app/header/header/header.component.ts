import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  value = '';

  extraValue = '';

  user = 'Your Name';

  showSort = true;

  handleShowSort() {
    this.showSort = !this.showSort;
  }
}
