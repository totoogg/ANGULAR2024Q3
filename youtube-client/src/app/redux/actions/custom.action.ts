import { createAction, props } from '@ngrx/store';
import { ICustomCard } from '../../admin/models/customCard.model';

export const addCustomCard = createAction(
  '[Custom Card] Add Custom Card',
  props<{ customCards: ICustomCard }>(),
);

export const removeCustomCard = createAction(
  '[Custom Card] Remove Custom Card',
  props<{ id: string }>(),
);

export const customCardFailed = createAction(
  '[Custom Card] Custom Card Failed',
);
