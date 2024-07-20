import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFind } from '../../shared/models/IFind';

@Injectable({
  providedIn: 'root',
})
export class FindService {
  value = '';

  start = true;

  valuePush = new BehaviorSubject<string>('');

  startPush = new BehaviorSubject<boolean>(true);

  changeOption(obj: IFind) {
    this.value = obj.value;
    this.start = obj.start;

    this.valuePush.next(obj.value);
    this.startPush.next(obj.start);
  }
}
