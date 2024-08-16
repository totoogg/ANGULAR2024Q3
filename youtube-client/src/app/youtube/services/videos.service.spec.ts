import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { VideosService } from './videos.service';
import { IItem } from '../models/search-item.model';
import { IData } from '../models/search-response.model';

describe('VideosService', () => {
  let service: VideosService;
  let httpTestingController: HttpTestingController;

  const initialState = {
    app: {
      isLoading: false,
      page: 0,
      tokenPagePrev: '',
      tokenPageNext: '',
      allVideos: {},
      showVideos: [],
      total: 0,
      favoriteId: [],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideMockStore({ initialState })],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user', () => {
    const dataUser: IItem = {
      kind: '',
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
    };

    const userStub: IData = {
      kind: '1',
      etag: '1',
      nextPageToken: 'next',
      prevPageToken: 'prev',
      pageInfo: {
        resultsPerPage: 1,
        totalResults: 2,
      },
      items: [dataUser],
    };

    const path = 'videos?part=snippet,statistics&id=1';

    service.getById('1').subscribe((data) => expect(data).toEqual(userStub));
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(userStub);
  });

  it('should return current user', () => {
    const dataUser: IItem = {
      kind: '',
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
    };

    const userStub: IData = {
      kind: '1',
      etag: '1',
      nextPageToken: 'next',
      prevPageToken: 'prev',
      pageInfo: {
        resultsPerPage: 1,
        totalResults: 2,
      },
      items: [dataUser],
    };

    const path = 'videos?part=snippet,statistics&id=1';

    service.getById('1').subscribe((data) => expect(data).toEqual(userStub));
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(userStub);
  });

  it('should return current user', () => {
    const dataUser: IItem = {
      kind: '',
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
    };

    const userStub: IData = {
      kind: '1',
      etag: '1',
      nextPageToken: 'next',
      prevPageToken: 'prev',
      pageInfo: {
        resultsPerPage: 1,
        totalResults: 2,
      },
      items: [dataUser],
    };

    const path = 'videos?part=snippet,statistics&id=1';

    service.getById('1').subscribe((data) => expect(data).toEqual(dataUser));
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(userStub.items[0]);
  });

  it('should return current all user', () => {
    const dataUser: IItem = {
      kind: '',
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
    };

    const userStub: IData = {
      kind: '1',
      etag: '1',
      nextPageToken: 'next',
      prevPageToken: 'prev',
      pageInfo: {
        resultsPerPage: 1,
        totalResults: 2,
      },
      items: [dataUser],
    };

    const path = 'videos?part=snippet,statistics&id=1';

    service.getAllById('1').subscribe((data) => expect(data).toEqual(dataUser));
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(userStub.items[0]);
  });

  it('should return current all user id', () => {
    const dataUser: IItem = {
      kind: '',
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
    };

    const userStub: IData = {
      kind: '1',
      etag: '1',
      nextPageToken: 'next',
      prevPageToken: 'prev',
      pageInfo: {
        resultsPerPage: 1,
        totalResults: 2,
      },
      items: [dataUser],
    };

    const path = 'search?type=video&part=snippet&maxResults=20&q=1&pageToken=';

    service.getAll('1').subscribe((data) => expect(data).toEqual(dataUser));
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(userStub.items[0]);
  });
});
