import { Injectable } from '@angular/core';
import { IItem } from '../models/search-item.model';
import { data } from '../../data/data';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  videos: IItem[] = [];

  getAll() {
    this.videos = data.items;
  }

  getById(id: string) {
    return this.videos.find((el) => el.id === id);
  }
}
