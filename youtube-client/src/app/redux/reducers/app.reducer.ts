import { createReducer, on } from '@ngrx/store';
import * as CustomActions from '../actions/custom.action';
import * as appActions from '../actions/app.actions';
import { ICustomCard } from '../../admin/models/customCard.model';
import * as YoutubeAction from '../actions/youtube.action';
import { IItem } from '../../youtube/models/search-item.model';

export interface AppState {
  isLoading: boolean;
  customCards: ICustomCard[];
  page: number;
  tokenPage: string;
  videos: IItem[];
  showCards: (ICustomCard | IItem)[];
  fullCards: (ICustomCard | IItem)[];
}

export const initialState: AppState = {
  isLoading: false,
  customCards: [],
  page: 0,
  showCards: [],
  tokenPage: '',
  videos: [],
  fullCards: [],
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
  on(
    CustomActions.addCustomCard,
    (state, { customCards }): AppState => ({
      ...state,
      customCards: [...state.customCards, customCards],
      fullCards: [customCards, ...state.fullCards],
    }),
  ),
  on(CustomActions.removeCustomCard, (state, { id }) => ({
    ...state,
    customCards: [...state.customCards].filter((el) => el.id !== id),
    fullCards: [...state.fullCards].filter((el) => el.id !== id),
  })),
  on(
    YoutubeAction.searchYoutubeVideos,
    (state): AppState => ({
      ...state,
      page: 0,
      tokenPage: '',
      fullCards: [...state.customCards],
    }),
  ),
  on(
    YoutubeAction.updateYoutubePageNext,
    (state, { page, tokenPage }): AppState => ({
      ...state,
      page,
      tokenPage,
    }),
  ),
  on(
    YoutubeAction.updateYoutubePagePrev,
    (state, { page, tokenPage }): AppState => ({
      ...state,
      page,
      tokenPage,
      fullCards: [...state.fullCards].slice(0, -20),
    }),
  ),
  on(
    YoutubeAction.updateYoutubeVideos,
    (state, { videos }): AppState => ({
      ...state,
      videos: [...videos],
    }),
  ),
  on(
    YoutubeAction.updateFullCards,
    (state, { videos }): AppState => ({
      ...state,
      fullCards: [...state.fullCards, ...videos],
    }),
  ),
  on(
    YoutubeAction.updateShowCards,
    (state): AppState => ({
      ...state,
      showCards: [...state.fullCards].slice(
        state.page * 20,
        state.page * 20 + 20,
      ),
    }),
  ),
);
