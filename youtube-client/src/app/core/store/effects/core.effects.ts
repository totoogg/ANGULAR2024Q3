import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  map,
  of,
  withLatestFrom,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavoriteActions from '../actions/core.action';
import * as FavoriteSelectors from '../selectors/core.selector';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
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
}
