import { createReducer, on } from '@ngrx/store';
import * as CustomActions from '../actions/custom.action';
import * as appActions from '../actions/app.actions';
import { ICustomCard } from '../../admin/models/customCard.model';
import * as YoutubeAction from '../actions/youtube.action';
import { IItem } from '../../youtube/models/search-item.model';

export interface AppState {
  isLoading: boolean;
  page: number;
  tokenPagePrev: string;
  tokenPageNext: string;
  allVideos: {
    [id: string]: ICustomCard | IItem
  };
  showVideos: string[];
  total: number;
}

export const initialState: AppState = {
  isLoading: false,
  page: 0,
  tokenPagePrev: '',
  tokenPageNext: '',
  allVideos: {},
  showVideos: [],
  total: 0,
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
      allVideos: { ...customCards, ...state.allVideos },
    }),
  ),
  on(CustomActions.removeCustomCard, (state, { id }) => ({
    ...state,
    allVideos: { ...Object.fromEntries(Object.entries(state.allVideos).filter((el) => el[0] !== id)) },
  })),
  on(
    YoutubeAction.searchYoutubeVideos,
    (state): AppState => ({
      ...state,
      page: 0,
    }),
  ),
  on(
    YoutubeAction.updateTokenNext,
    (state, { token }): AppState => ({
      ...state,
      tokenPageNext: token,
    }),
  ),
  on(
    YoutubeAction.updateTokenPrev,
    (state, { token }): AppState => ({
      ...state,
      tokenPagePrev: token,
    }),
  ),
  on(
    YoutubeAction.updateAllVideos,
    (state, { videos }): AppState => ({
      ...state,
      allVideos: Object.keys(videos)[0] in state.allVideos ? { ...state.allVideos } : { ...state.allVideos, ...videos },
    }),
  ),
  on(
    YoutubeAction.updateTotalResult,
    (state, { total }): AppState => ({
      ...state,
      total,
    }),
  ),
  on(
    YoutubeAction.updateShowVideos,
    (state): AppState => ({
      ...state,
      showVideos: Object.keys(state.allVideos).slice(
        state.page * 20,
        state.page * 20 + 20,
      ).length < 20 ? Object.keys(state.allVideos).slice(-20) : Object.keys(state.allVideos).slice(
          state.page * 20,
          state.page * 20 + 20,
        ),
    }),
  ),
);
