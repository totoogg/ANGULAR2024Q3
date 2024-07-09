import { Component } from '@angular/core';
import { IFind } from './youtube/models/IFind';
import { ISort } from './youtube/models/ISort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youtube-client';

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
