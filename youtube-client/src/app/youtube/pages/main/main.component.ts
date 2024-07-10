import { Component } from '@angular/core';
import { IFind } from '../../../shared/models/IFind';
import { ISort } from '../../../shared/models/ISort';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  term: IFind = {
    value: '',
    start: true,
  };

  findWord: string = '';

  sortVideoArr: ISort = {
    activeSortDate: false,
    ascDate: false,
    descDate: false,
    activeSortView: false,
    ascView: false,
    descView: false,
  };

  addTerm(item: IFind) {
    this.term = item;
  }

  addFindWord(item: string) {
    this.findWord = item;
  }

  sortVideo(item: ISort) {
    this.sortVideoArr = item;
  }
}
