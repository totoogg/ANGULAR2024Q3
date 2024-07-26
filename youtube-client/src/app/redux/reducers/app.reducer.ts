import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';

export interface AppState {
  isLoading: boolean;
}

export const initialState: AppState = {
  isLoading: false,
};

export const appReducer = createReducer(
  initialState,
  on(
    appActions.setLoadingState,
    (state, { isLoading }): AppState => ({
      ...state,
      isLoading,
    }),
  ),
);
