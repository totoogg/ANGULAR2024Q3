import { Action } from '@ngrx/store';
import { appReducer, initialState, AppState } from './app.reducer';
import * as AppActions from '../actions/app.actions';
import * as CustomActions from '../actions/custom.action';
import * as YoutubeAction from '../actions/youtube.action';
import { ICustomCard } from '../../admin/models/customCard.model';

describe('AppReducer', () => {
  let state: AppState;

  beforeEach(() => {
    state = initialState;
  });

  describe('valid app actions', () => {
    it('setLoadingState() should set load run true', () => {
      const action = AppActions.setLoadingState({ isLoading: true });
      const result = appReducer(state, action);

      expect(result.isLoading).toBeTruthy();
    });
  });

  describe('valid custom actions', () => {
    const user: ICustomCard = {
      id: '1',
      videoLink: '2',
      snippet: {
        description: '3',
        publishedAt: '4',
        title: '5',
        thumbnails: {
          high: {
            url: '6',
          },
        },
      },
      statistics: {
        viewCount: '7',
      },
    };

    const user2: ICustomCard = {
      id: '2',
      videoLink: '2',
      snippet: {
        description: '3',
        publishedAt: '4',
        title: '5',
        thumbnails: {
          high: {
            url: '6',
          },
        },
      },
      statistics: {
        viewCount: '7',
      },
    };

    it('addCustomCard()', () => {
      const action = CustomActions.addCustomCard({ customCards: user });
      const result = appReducer(state, action);

      expect(result.allVideos[user.id]).toStrictEqual(undefined);
    });

    it('removeCustomCard()', () => {
      state.allVideos = {
        [user.id]: user,
        [user2.id]: user2,
      };
      state.showVideos = [user.id, user2.id];

      const action = CustomActions.removeCustomCard({ id: '1' });
      const result = appReducer(state, action);

      expect(result.allVideos[user.id]).toBe(undefined);
      expect(result.allVideos[user2.id]).toStrictEqual(user2);
      expect(result.showVideos.length).toBe(2);
    });
  });

  describe('valid youtube actions', () => {
    const videosResult = {
      1: {
        kind: '1',
        id: '1',
        snippet: {
          title: '5',
          publishedAt: '4',
          description: '3',
          thumbnails: {
            high: {
              url: '6',
            },
          },
        },
        statistics: {
          viewCount: '',
          likeCount: '',
          dislikeCount: '',
          favoriteCount: '',
          commentCount: '',
        },
      },
      2: {
        kind: '2',
        id: '2',
        snippet: {
          title: '',
          publishedAt: '',
          description: '',
          thumbnails: {
            high: {
              url: '',
            },
          },
        },
        statistics: {
          viewCount: '',
          likeCount: '',
          dislikeCount: '',
          favoriteCount: '',
          commentCount: '',
        },
      },
    };
    const videos = [{
      kind: '1',
      id: '1',
      snippet: {
        title: '',
        publishedAt: '',
        description: '',
        thumbnails: {
          high: {
            url: '',
          },
        },
      },
      statistics: {
        viewCount: '',
        likeCount: '',
        dislikeCount: '',
        favoriteCount: '',
        commentCount: '',
      },
    },
    {
      kind: '2',
      id: '2',
      snippet: {
        title: '',
        publishedAt: '',
        description: '',
        thumbnails: {
          high: {
            url: '',
          },
        },
      },
      statistics: {
        viewCount: '',
        likeCount: '',
        dislikeCount: '',
        favoriteCount: '',
        commentCount: '',
      },
    }];

    it('searchYoutubeVideos()', () => {
      const action = YoutubeAction.searchYoutubeVideos();
      const result = appReducer(state, action);

      expect(result.page).toBe(0);
    });

    it('updateYoutubePageNext()', () => {
      const action = YoutubeAction.updateYoutubePageNext({ page: 1 });
      const result = appReducer(state, action);

      expect(result.page).toBe(1);
    });

    it('updateYoutubePagePrev()', () => {
      const action = YoutubeAction.updateYoutubePagePrev({ page: 1 });
      const result = appReducer(state, action);

      expect(result.page).toBe(-1);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action<string>;

      const result = appReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
