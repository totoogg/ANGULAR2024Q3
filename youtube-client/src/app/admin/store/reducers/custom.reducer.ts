import { createReducer, on } from '@ngrx/store';
import * as CustomActions from '../actions/custom.action';
import { ICustomCard } from '../../models/customCard.model';

export interface CustomState {
  customCards: ICustomCard[];
}

export const initialState: CustomState = {
  customCards: [],
};

export const customReducer = createReducer(
  initialState,
  on(
    CustomActions.addCustomCard,
    (state, { customCards }): CustomState => ({
      ...state,
      customCards: [...state.customCards, customCards],
    }),
  ),
  on(CustomActions.removeCustomCard, (state, { id }) => ({
    ...state,
    customCards: [...state.customCards].filter((el) => el.id !== id),
  })),
);
