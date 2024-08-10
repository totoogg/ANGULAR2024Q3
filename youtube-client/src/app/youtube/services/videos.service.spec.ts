import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { VideosService } from './videos.service';
import { IItem } from '../models/search-item.model';
import { IData } from '../models/search-response.model';

describe('VideosService', () => {
  let service: VideosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('userLogout()', (done) => {
    service.loadingChange(true);

    expect(lastValueFrom(service.loading$)).resolves.toEqual(true);
    done();
  });

  it('cleanVideo()', () => {
    service.cleanVideo();

    TestBed.flushEffects();

    expect(service.video$()).toBe(null);
  });

  it('changeVideo()', () => {
    const data: IItem = {
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

    service.changeVideo(data);

    TestBed.flushEffects();

    expect(service.video$()).toStrictEqual(data);
  });

  it('changeFavoriteVideo()', () => {
    service.changeFavoriteVideo('1');

    TestBed.flushEffects();

    expect(service.favoriteVideos$()).toStrictEqual([]);
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

  it('should return current favorite user', () => {
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

    service.getAllByFavorite('1').subscribe((data) => expect(data).toEqual(dataUser));
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
