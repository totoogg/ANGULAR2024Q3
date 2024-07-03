import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() addTerm = new EventEmitter<string>();

  value = '';

  extraValue = '';

  user = 'Your Name';

  showSort = true;

  handleShowSort() {
    this.showSort = !this.showSort;
  }

  handleFind() {
    this.addTerm.emit(this.value);
  }
}
