import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  finalize,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideosService } from '../../../youtube/services/videos.service';
import * as FavoriteActions from '../actions/core.action';
import * as FavoriteSelectors from '../selectors/core.selector';
import * as AppActions from '../../../redux/actions/app.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private videoService: VideosService,
  ) {}

  updateFavoriteIcon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.toggleVideoInFavorite),
      map((action) => action.id),
      concatMap((action) => of(action).pipe(
        withLatestFrom(
          this.store.select(FavoriteSelectors.selectGetFavorite),
        ),
      )),
      map((res) => {
        if (res[1].includes(res[0])) {
          return FavoriteActions.removeVideoInFavorite({ id: res[0] });
        }
        return FavoriteActions.addVideoInFavorite({ id: res[0] });
      }),
    );
  });

  updateFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        FavoriteActions.addVideoInFavorite,
        FavoriteActions.removeVideoInFavorite,
      ),
      tap(() => {
        this.store.dispatch(AppActions.setLoadingState({ isLoading: true }));
      }),
      map((action) => action.id),
      concatMap((action) => of(action).pipe(
        withLatestFrom(
          this.store.select(FavoriteSelectors.selectGetFavorite),
        ),
      )),
      switchMap((res) => this.videoService.getAllByFavorite(res[1].join(',')).pipe(
        map(() => FavoriteActions.updateFavoriteSuccess()),
        catchError(() => of(FavoriteActions.updateFavoriteFailed())),
        finalize(() => this.store.dispatch(
          AppActions.setLoadingState({ isLoading: false }),
        )),
      )),
    );
  });
}
