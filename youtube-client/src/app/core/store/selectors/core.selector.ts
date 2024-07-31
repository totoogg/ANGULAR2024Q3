import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from '../reducers/core.reducer';
import { AppState } from '../../../redux/reducers/app.reducer';

export const selectGetFavoriteState = createFeatureSelector<FavoriteState>('favorite');

export const selectGetAppState = createFeatureSelector<AppState>('app');

export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);

export const selectGetFavoriteId = (id: string) => createSelector(selectGetFavoriteState, (state: FavoriteState) => state.favoriteId.find((el) => el === id));

export const selectGetFavorite = createSelector(
  selectGetFavoriteState,
  (state) => state.favoriteId,
);
