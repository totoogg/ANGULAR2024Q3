import { createAction, props } from '@ngrx/store';

export const toggleVideoInFavorite = createAction(
  '[Favorite] Toggle Video In Favorite',
  props<{ id: string }>(),
);

export const addVideoInFavorite = createAction(
  '[Favorite] Add Video In Favorite',
  props<{ id: string }>(),
);

export const removeVideoInFavorite = createAction(
  '[Favorite] Remove Video In Favorite',
  props<{ id: string }>(),
);
