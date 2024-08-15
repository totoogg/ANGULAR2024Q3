import { Injectable } from '@angular/core';
import {
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
import { Store } from '@ngrx/store';
import { IData } from '../models/search-response.model';
import { IDataVideo } from '../models/seach-video';
import * as YoutubeAction from '../../redux/actions/youtube.action';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient, private store: Store) {}

  getAll(str: string, page?: string): Observable<IData | string> {
    return this.http
      .get<IDataVideo>('search', {
      params: new HttpParams({
        fromObject: {
          type: 'video',
          part: 'snippet',
          maxResults: 20,
          q: str,
          pageToken: page || '',
        },
      }),
    })
      .pipe(
        debounceTime(500),
        retry(2),
        tap((res) => {
          this.store.dispatch(YoutubeAction.updateTotalResult({ total: res.pageInfo.totalResults }));
          this.store.dispatch(YoutubeAction.updateTokenNext({ token: res.nextPageToken }));
          if (res.prevPageToken) {
            this.store.dispatch(YoutubeAction.updateTokenPrev({ token: res.prevPageToken }));
          }
        }),
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
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
