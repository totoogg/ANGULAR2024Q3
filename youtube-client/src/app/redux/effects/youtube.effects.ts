import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, finalize, map, of, switchMap, tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as YoutubeAction from '../actions/youtube.action';
import * as CustomAction from '../actions/custom.action';
import * as AppActions from '../actions/app.actions';
import { VideosService } from '../../youtube/services/videos.service';
import { FindService } from '../../core/services/find.service';
import { IItem } from '../../youtube/models/search-item.model';
import { IData } from '../../youtube/models/search-response.model';

@Injectable()
export class YoutubeEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private videoService: VideosService,
    private findService: FindService,
  ) {}

  updatePageNext$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.updateYoutubePageNext),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      switchMap(({ tokenPage }) => this.videoService.getAll(this.findService.value.trim(), tokenPage).pipe(
        map((res) => YoutubeAction.updateYoutubeVideos({
          videos: (res as IData).items as IItem[],
        })),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
        finalize(() => this.store.dispatch(
          AppActions.setLoadingState({ isLoading: false }),
        )),
      )),
    );
  });

  updatePagePrev$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.updateYoutubePagePrev),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      switchMap(({ tokenPage }) => this.videoService.getAll(this.findService.value.trim(), tokenPage).pipe(
        map(() => YoutubeAction.updateShowCards()),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
        finalize(() => this.store.dispatch(
          AppActions.setLoadingState({ isLoading: false }),
        )),
      )),
    );
  });

  searchVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.searchYoutubeVideos),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      switchMap(() => this.videoService.getAll(this.findService.value.trim(), '').pipe(
        map((res) => YoutubeAction.updateYoutubeVideos({
          videos: (res as IData).items as IItem[],
        })),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
        finalize(() => this.store.dispatch(
          AppActions.setLoadingState({ isLoading: false }),
        )),
      )),
    );
  });

  updateFullCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.updateYoutubeVideos),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      map((res) => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: false }));
        return YoutubeAction.updateFullCards({ videos: res.videos });
      }),
      catchError(() => of(YoutubeAction.updateYoutubeFailed())),
    );
  });

  updateShowCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.updateFullCards, CustomAction.removeCustomCard),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      map(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: false }));
        return YoutubeAction.updateShowCards();
      }),
      catchError(() => of(YoutubeAction.updateYoutubeFailed())),
    );
  });
}
