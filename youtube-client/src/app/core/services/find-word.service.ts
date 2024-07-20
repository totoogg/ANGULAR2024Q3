import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindWordService {
  word = new BehaviorSubject<string>('');

  changeWord(str: string) {
    this.word.next(str);
  }
}
