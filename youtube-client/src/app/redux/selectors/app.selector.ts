import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const selectGetAppState = createFeatureSelector<AppState>('app');
export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);
