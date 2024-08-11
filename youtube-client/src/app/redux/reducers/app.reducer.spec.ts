import { Action } from '@ngrx/store';
import { appReducer, initialState, AppState } from './app.reducer';
import * as AppActions from '../actions/app.actions';
import * as CustomActions from '../actions/custom.action';
import * as YoutubeAction from '../actions/youtube.action';
import { ICustomCard } from '../../admin/models/customCard.model';
import { IItem } from '../../youtube/models/search-item.model';

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

      expect(result.customCards.includes(user)).toBeTruthy();
      expect(result.fullCards.includes(user)).toBeTruthy();
    });

    it('removeCustomCard()', () => {
      state.fullCards = [user, user2];
      state.showCards = [user, user2];

      const action = CustomActions.removeCustomCard({ id: '1' });
      const result = appReducer(state, action);

      expect(result.customCards.includes(user)).toBeFalsy();
      expect(result.fullCards.includes(user2)).toBeTruthy();
      expect(result.fullCards.length).toBe(1);
      expect(result.customCards.length).toBe(0);
    });
  });

  describe('valid youtube actions', () => {
    const videos: IItem[] = [
      {
        kind: '1',
        id: '',
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
      }, {
        kind: '2',
        id: '',
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
    ];

    it('searchYoutubeVideos()', () => {
      const action = YoutubeAction.searchYoutubeVideos();
      const result = appReducer(state, action);

      expect(result.page).toBe(0);
      expect(result.tokenPage).toBe('');
    });

    it('updateYoutubePageNext()', () => {
      const action = YoutubeAction.updateYoutubePageNext({ page: 1, tokenPage: 'asd' });
      const result = appReducer(state, action);

      expect(result.page).toBe(1);
      expect(result.tokenPage).toBe('asd');
    });

    it('updateYoutubePagePrev()', () => {
      const action = YoutubeAction.updateYoutubePagePrev({ page: 1, tokenPage: 'asd' });
      const result = appReducer(state, action);

      expect(result.page).toBe(1);
      expect(result.tokenPage).toBe('asd');
    });

    it('updateYoutubeVideos()', () => {
      const action = YoutubeAction.updateYoutubeVideos({ videos });
      const result = appReducer(state, action);

      expect(result.videos).toStrictEqual(videos);
    });

    it('updateFullCards()', () => {
      const action = YoutubeAction.updateFullCards({ videos });
      const result = appReducer(state, action);

      expect(result.fullCards.length).toBe(4);
    });

    it('updateShowCards()', () => {
      const action = YoutubeAction.updateShowCards();
      const result = appReducer(state, action);

      expect(result.showCards.length).toBe(2);
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
