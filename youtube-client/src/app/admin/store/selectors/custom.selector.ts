import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { CustomState } from '../reducers/custom.reducer';

export const selectGetCustomState = createFeatureSelector<CustomState>('custom');
export const selectGetCustomsCards = createSelector(
  selectGetCustomState,
  (state: CustomState) => state.customCards,
);
