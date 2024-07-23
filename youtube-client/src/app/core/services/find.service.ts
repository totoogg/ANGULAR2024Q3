import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFind } from '../../shared/models/IFind';

@Injectable({
  providedIn: 'root',
})
export class FindService {
  value = '';

  start = true;

  private valuePush = new BehaviorSubject<string>('');

  valuePush$ = this.valuePush.asObservable();

  private startPush = new BehaviorSubject<boolean>(true);

  startPush$ = this.startPush.asObservable();

  changeOption(obj: IFind) {
    this.value = obj.value;
    this.start = obj.start;

    this.valuePush.next(obj.value);
    this.startPush.next(obj.start);
  }
}
