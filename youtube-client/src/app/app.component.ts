import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { ISort } from './models/ISort';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, SearchResultsComponent],
})
export class AppComponent {
  title = 'youtube-client';

  term: string = '';

  sortVideoArr: ISort = {
    activeSortDate: false,
    ascDate: false,
    descDate: false,
    activeSortView: false,
    ascView: false,
    descView: false,
  };

  addTerm(item: string) {
    this.term = item;
  }

  sortVideo(item: ISort) {
    this.sortVideoArr = item;
  }
}
