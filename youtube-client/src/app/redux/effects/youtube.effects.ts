import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, concatMap, finalize, map, of, switchMap, tap,
  withLatestFrom,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as YoutubeAction from '../actions/youtube.action';
import * as AppSelectors from '../selectors/app.selector';
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
      concatMap((action) => of(action).pipe(
        withLatestFrom(
          this.store.select(AppSelectors.selectGetTokenNext),
        ),
      )),
      switchMap((req) => this.videoService.getAll(this.findService.value.trim(), req[1]).pipe(
        map((res) => {
          const a = (res as IData).items.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {} as { [id: string]: IItem });
          return YoutubeAction.updateAddVideos({ videos: a });
        }),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
        finalize(() => of(
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
      concatMap((action) => of(action).pipe(
        withLatestFrom(
          this.store.select(AppSelectors.selectGetTokenPrev),
        ),
      )),
      switchMap((req) => this.videoService.getAll(this.findService.value.trim(), req[1]).pipe(
        map(() => YoutubeAction.updateShowVideos()),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
      )),
    );
  });

  searchAllVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.searchYoutubeVideos),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      switchMap(() => this.videoService.getAll(this.findService.value.trim(), '').pipe(
        map((res) => {
          const a = (res as IData).items.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {} as { [id: string]: IItem });
          return YoutubeAction.updateAllVideos({ videos: a });
        }),
        catchError(() => of(YoutubeAction.updateYoutubeFailed())),
      )),
    );
  });

  updateShowVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.updateAllVideos, YoutubeAction.updateAddVideos, CustomAction.addCustomCard, CustomAction.removeCustomCard),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      map(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: false }));
        return YoutubeAction.updateShowVideos();
      }),
      catchError(() => of(YoutubeAction.updateYoutubeFailed())),
    );
  });
}
