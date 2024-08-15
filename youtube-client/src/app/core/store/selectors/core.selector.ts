import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from '../reducers/core.reducer';
import { AppState } from '../../../redux/reducers/app.reducer';

export const selectGetFavoriteState = createFeatureSelector<FavoriteState>('favorite');

export const selectGetAppState = createFeatureSelector<AppState>('app');

export const selectGetFavoriteId = (id: string) => createSelector(selectGetFavoriteState, (state: FavoriteState) => state.favoriteId.find((el) => el === id));

export const selectGetFavorite = createSelector(
  selectGetFavoriteState,
  (state) => state.favoriteId,
);

export const selectGetFavoriteVideos = createSelector(
  selectGetFavoriteState,
  selectGetAppState,
  (stateFavorite: FavoriteState, stateApp: AppState) => stateFavorite.favoriteId.map((el) => stateApp.allVideos[el]),
);
