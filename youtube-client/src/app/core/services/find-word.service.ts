import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindWordService {
  private word = new BehaviorSubject<string>('');

  word$ = this.word.asObservable();

  changeWord(str: string) {
    this.word.next(str);
  }
}
