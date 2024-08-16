import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import { AppState } from '../reducers/app.reducer';

export const { selectRouteParams } = getRouterSelectors();

export const selectGetAppState = createFeatureSelector<AppState>('app');

export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);

export const selectGetPage = createSelector(
  selectGetAppState,
  (state: AppState) => state.page,
);

export const selectGetTokenNext = createSelector(
  selectGetAppState,
  (state: AppState) => state.tokenPageNext,
);

export const selectGetTokenPrev = createSelector(
  selectGetAppState,
  (state: AppState) => state.tokenPagePrev,
);

export const selectGetAllVideos = createSelector(
  selectGetAppState,
  (state: AppState) => Object.values(state.allVideos),
);

export const selectGetTotal = createSelector(
  selectGetAppState,
  (state: AppState) => state.total,
);

export const selectGetVideo = (id: string) => createSelector(selectGetAppState, (state: AppState) => state.allVideos[id]);

export const selectGetShowVideos = createSelector(
  selectGetAppState,
  (state: AppState) => state.showVideos.map((el) => state.allVideos[el]),
);
