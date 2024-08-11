import { ICustomCard } from '../../admin/models/customCard.model';
import { IItem } from '../../youtube/models/search-item.model';
import { AppState } from '../reducers/app.reducer';
import * as AppSelectors from './app.selector';

describe('Selectors', () => {
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

  const videos: IItem[] = [
    {
      kind: '1',
      id: '3',
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
      id: '4',
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

  const initialState: AppState = {
    isLoading: false,
    customCards: [user, user2],
    page: 2,
    showCards: [...videos, user, user2],
    tokenPage: '1',
    videos: [...videos],
    fullCards: [...videos, user, user2],
  };

  it('should select isLoading', () => {
    const result = AppSelectors.selectGetAppState.projector(initialState.isLoading);
    expect(result).toEqual(false);
  });

  it('should select GetCustomsCards', () => {
    const result = AppSelectors.selectGetCustomsCards.projector(initialState);
    expect(result).toStrictEqual([user, user2]);
  });

  it('should select GetPage', () => {
    const result = AppSelectors.selectGetPage.projector(initialState);
    expect(result).toEqual(2);
  });

  it('should select GetTokenPage', () => {
    const result = AppSelectors.selectGetTokenPage.projector(initialState);
    expect(result).toEqual('1');
  });

  it('should select GetVideos', () => {
    const result = AppSelectors.selectGetVideos.projector(initialState);
    expect(result).toStrictEqual([...videos]);
  });

  it('should select GetShowCards', () => {
    const result = AppSelectors.selectGetShowCards.projector(initialState);
    expect(result).toStrictEqual([...videos, user, user2]);
  });

  it('should select GetFullCards', () => {
    const result = AppSelectors.selectGetFullCards.projector(initialState);
    expect(result).toStrictEqual([...videos, user, user2]);
  });

  it('should select GetId', () => {
    const result = AppSelectors.selectGetId('1').projector(initialState);
    expect(result).toStrictEqual(user);
  });
});
