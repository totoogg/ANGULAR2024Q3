import { Injectable } from '@angular/core';
import { IFind } from '../../shared/models/IFind';

@Injectable({
  providedIn: 'root',
})
export class FindService {
  value = '';

  start = true;

  changeOption(obj: IFind) {
    this.value = obj.value;
    this.start = obj.start;
  }
}
