import { AppState } from '../reducers/app.reducer';
import * as AppSelectors from './app.selector';

describe('Selectors', () => {
  const videos = {
    1: {
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
    },
    2: {
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
    },
    3: {
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
    },
    4: {
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
  };

  const initialState: AppState = {
    isLoading: false,
    page: 2,
    tokenPagePrev: '',
    tokenPageNext: '',
    allVideos: { ...videos },
    showVideos: ['1', '2', '3', '4'],
    total: 0,
  };

  it('should select isLoading', () => {
    const result = AppSelectors.selectGetAppState.projector(initialState.isLoading);
    expect(result).toEqual(false);
  });

  it('should select GetPage', () => {
    const result = AppSelectors.selectGetPage.projector(initialState);
    expect(result).toEqual(2);
  });

  it('should select GetTokenNext', () => {
    const result = AppSelectors.selectGetTokenNext.projector(initialState);
    expect(result).toEqual('');
  });

  it('should select GetTokenPrev', () => {
    const result = AppSelectors.selectGetTokenPrev.projector(initialState);
    expect(result).toEqual('');
  });

  it('should select GetAllVideos', () => {
    const result = AppSelectors.selectGetAllVideos.projector(initialState);
    expect(result).toStrictEqual(Object.values(videos));
  });

  it('should select GetShowVideos', () => {
    const result = AppSelectors.selectGetShowVideos.projector(initialState);
    expect(result).toStrictEqual(Object.values(videos));
  });

  it('should select GetTotal', () => {
    const result = AppSelectors.selectGetTotal.projector(initialState);
    expect(result).toBe(0);
  });

  it('should select GetVideo', () => {
    const result = AppSelectors.selectGetVideo('1').projector(initialState);
    expect(result).toStrictEqual(videos['1']);
  });
});
