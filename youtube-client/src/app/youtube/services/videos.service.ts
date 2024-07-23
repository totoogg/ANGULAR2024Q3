import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Observable,
  of,
  retry,
  switchMap,
  tap,
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { IItem } from '../models/search-item.model';
import { IData } from '../models/search-response.model';
import { IDataVideo } from '../models/seach-video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient) {}

  loading = new BehaviorSubject<boolean>(false);

  videos = new BehaviorSubject<IItem[]>([]);

  video = new BehaviorSubject<IItem | undefined>(undefined);

  getAll(str: string): Observable<IData | string> {
    return this.http
      .get<IDataVideo>('search', {
      params: new HttpParams({
        fromObject: {
          type: 'video',
          part: 'snippet',
          maxResults: 15,
          q: str,
        },
      }),
    })
      .pipe(
        debounceTime(500),
        retry(2),
        map((v) => v.items.map((el) => el.id.videoId).join(',')),
        switchMap((id) => this.getAllById(id)),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  getAllById(str: string): Observable<IData | string> {
    return this.http
      .get<IData>('videos', {
      params: new HttpParams({
        fromObject: {
          part: 'snippet,statistics',
          id: str,
        },
      }),
    })
      .pipe(
        retry(2),
        tap((videos) => {
          this.videos.next(videos.items);
        }),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  getById(id: string): Observable<IData | string> {
    return this.http
      .get<IData>('videos', {
      params: new HttpParams({
        fromObject: {
          part: 'snippet,statistics',
          id,
        },
      }),
    })
      .pipe(
        retry(2),
        tap((videos) => {
          this.video.next(videos.items[0]);
        }),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  loadingChange(state: boolean) {
    this.loading.next(state);
  }

  cleanVideo() {
    this.video.next(undefined);
  }
}
