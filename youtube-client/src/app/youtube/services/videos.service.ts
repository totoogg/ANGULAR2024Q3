import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
import { Store } from '@ngrx/store';
import { IItem } from '../models/search-item.model';
import { IData } from '../models/search-response.model';
import { IDataVideo } from '../models/seach-video';
import * as YoutubeAction from '../../redux/actions/youtube.action';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient, private store: Store) {}

  private loading = new BehaviorSubject<boolean>(false);

  loading$ = this.loading.asObservable();

  private favoriteVideos = signal<IItem[]>([]);

  favoriteVideos$ = toSignal(toObservable(this.favoriteVideos));

  private video = signal<IItem | null>(null);

  video$ = toSignal(toObservable(this.video));

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
        tap((videos) => {
          this.video.set(videos.items[0]);
        }),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  loadingChange(state: boolean) {
    this.loading.next(state);
  }

  cleanVideo() {
    this.video.set(null);
  }

  changeVideo(video: IItem) {
    this.video.set(video);
  }

  changeFavoriteVideo(id: string) {
    this.favoriteVideos.update((prev) => prev.filter((video) => video.id !== id));
  }
}
