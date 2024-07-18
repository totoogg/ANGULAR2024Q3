import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
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

  loading = false;

  videos: IItem[] = [];

  getAll(str: string): Observable<IData | string> {
    return this.http
      .get<IDataVideo>('https://www.googleapis.com/youtube/v3/search', {
      params: new HttpParams({
        fromObject: {
          key: 'AIzaSyDCTITxmwZEvabIToN4n2cRc0xHcVX_FZM',
          type: 'video',
          part: 'snippet',
          maxResults: 15,
          q: str,
        },
      }),
    })
      .pipe(
        delay(500),
        retry(2),
        map((v) => v.items.map((el) => el.id.videoId).join(',')),
        switchMap((id) => this.getAllById(id)),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  getAllById(str: string): Observable<IData | string> {
    return this.http
      .get<IData>('https://www.googleapis.com/youtube/v3/videos', {
      params: new HttpParams({
        fromObject: {
          key: 'AIzaSyDCTITxmwZEvabIToN4n2cRc0xHcVX_FZM',
          part: 'snippet,statistics',
          id: str,
        },
      }),
    })
      .pipe(
        retry(2),
        tap((videos) => {
          this.videos = videos.items;
        }),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  getById(id: string) {
    return this.videos.find((el) => el.id === id);
  }

  loadingChange(state: boolean) {
    this.loading = state;
  }
}
