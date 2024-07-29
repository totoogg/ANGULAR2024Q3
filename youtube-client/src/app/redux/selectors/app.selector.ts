import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const selectGetAppState = createFeatureSelector<AppState>('app');

export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);

export const selectGetCustomsCards = createSelector(
  selectGetAppState,
  (state: AppState) => state.customCards,
);

export const selectGetPage = createSelector(
  selectGetAppState,
  (state: AppState) => state.page,
);

export const selectGetTokenPage = createSelector(
  selectGetAppState,
  (state: AppState) => state.tokenPage,
);

export const selectGetVideos = createSelector(
  selectGetAppState,
  (state: AppState) => state.videos,
);

export const selectGetShowCards = createSelector(
  selectGetAppState,
  (state: AppState) => state.showCards,
);

export const selectGetFullCards = createSelector(
  selectGetAppState,
  (state: AppState) => state.fullCards,
);
