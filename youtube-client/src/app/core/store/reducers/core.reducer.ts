import { createReducer, on } from '@ngrx/store';
import * as FavoriteAction from '../actions/core.action';

export interface FavoriteState {
  favoriteId: string[];
}

export const initialState: FavoriteState = {
  favoriteId: ['B-ib1mUWlnY'],
};

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteAction.addVideoInFavorite, (state, { id }) => ({
    ...state,
    favoriteId: [...state.favoriteId, id],
  })),
  on(FavoriteAction.removeVideoInFavorite, (state, { id }) => ({
    ...state,
    favoriteId: [...state.favoriteId].filter((el) => el !== id),
  })),
);
