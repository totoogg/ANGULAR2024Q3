import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FindWordService {
  word = '';

  changeWord(str: string) {
    this.word = str;
  }
}
