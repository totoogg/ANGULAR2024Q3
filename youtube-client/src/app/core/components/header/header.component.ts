import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFind } from '../../../youtube/models/IFind';
import { ISort } from '../../../youtube/models/ISort';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() addTermEvent = new EventEmitter<IFind>();

  @Output() addFindWordEvent = new EventEmitter<string>();

  @Output() sortVideoEvent = new EventEmitter<ISort>();

  value = '';

  start = true;

  extraValue = '';

  user = 'Your Name';

  showSort = false;

  activeSortDate = false;

  ascDate = false;

  descDate = true;

  activeSortView = false;

  ascView = false;

  descView = true;

  handleClickSortDate() {
    if (this.activeSortDate) {
      this.ascDate = !this.ascDate;
      this.descDate = !this.descDate;
    }

    this.activeSortDate = true;
    this.activeSortView = false;
    this.handleSort();
  }

  handleClickSortView() {
    if (this.activeSortView) {
      this.ascView = !this.ascView;
      this.descView = !this.descView;
    }

    this.activeSortDate = false;
    this.activeSortView = true;
    this.handleSort();
  }

  handleShowSort() {
    this.showSort = !this.showSort;
    if (!this.showSort) {
      this.extraValue = '';
      this.handleInputWord();
    }
  }

  handleFind() {
    if (this.value && this.start) {
      this.start = !this.start;
    }
    if (!this.start) {
      this.addTermEvent.emit({ value: this.value, start: this.start });
    }
  }

  handleInputWord() {
    this.addFindWordEvent.emit(this.extraValue);
  }

  handleSort() {
    const sort: ISort = {
      activeSortDate: this.activeSortDate,
      ascDate: this.ascDate,
      descDate: this.descDate,
      activeSortView: this.activeSortView,
      ascView: this.ascView,
      descView: this.descView,
    };
    this.sortVideoEvent.emit(sort);
  }
}
