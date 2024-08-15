import { createAction, props } from '@ngrx/store';

export const addCustomCard = createAction(
  '[Custom Card] Add Custom Card',
  props<{ customCards: object }>(),
);

export const removeCustomCard = createAction(
  '[Custom Card] Remove Custom Card',
  props<{ id: string }>(),
);
