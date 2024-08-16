import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { YoutubeEffects } from './youtube.effects';
import { VideosService } from '../../youtube/services/videos.service';
import * as YoutubeAction from '../actions/youtube.action';
import * as CustomAction from '../actions/custom.action';

class MockVideoService {
  getAll() {
    return of([]);
  }
}

describe('Todo effects', () => {
  let actions$: Actions;
  let effects$: YoutubeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: {} }),
        provideMockActions(() => actions$),
        YoutubeEffects,
        { provide: VideosService, useClass: MockVideoService },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects$ = TestBed.inject(YoutubeEffects);
  });

  it('should updatePageNext', (done) => {
    actions$ = of(YoutubeAction.updateYoutubePageNext({ page: 1 }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateAddVideos({
        videos: [],
      }));
    });
    done();
  });

  it('should updatePagePrev', (done) => {
    actions$ = of(YoutubeAction.updateYoutubePagePrev({ page: 1 }));
    effects$.updatePagePrev$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateShowVideos());
    });
    done();
  });

  it('should searchAllVideos', (done) => {
    actions$ = of(YoutubeAction.searchYoutubeVideos());
    effects$.searchAllVideos$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateAllVideos({
        videos: [],
      }));
    });
    done();
  });

  it('should updateShowVideos', (done) => {
    actions$ = of(YoutubeAction.updateAllVideos({ videos: [] }));
    effects$.updateShowVideos$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateShowVideos());
    });
    done();
  });
});
