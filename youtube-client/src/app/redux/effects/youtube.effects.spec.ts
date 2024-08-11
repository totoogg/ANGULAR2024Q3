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
    actions$ = of(YoutubeAction.updateYoutubePageNext({ page: 1, tokenPage: 'asd' }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateYoutubeVideos({
        videos: [],
      }));
    });
    done();
  });

  it('should updatePagePrev', (done) => {
    actions$ = of(YoutubeAction.updateYoutubePagePrev({ page: 1, tokenPage: 'asd' }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateYoutubeVideos({
        videos: [],
      }));
    });
    done();
  });

  it('should searchVideos', (done) => {
    actions$ = of(YoutubeAction.searchYoutubeVideos());
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateYoutubeVideos({
        videos: [],
      }));
    });
    done();
  });

  it('should updateFullCards', (done) => {
    actions$ = of(YoutubeAction.updateYoutubeVideos({ videos: [] }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateFullCards({
        videos: [],
      }));
    });
    done();
  });

  it('should updateShowCards', (done) => {
    actions$ = of(YoutubeAction.updateFullCards({ videos: [] }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateShowCards());
    });
    done();
  });

  it('should updateShowCards', (done) => {
    actions$ = of(CustomAction.removeCustomCard({ id: '1' }));
    effects$.updatePageNext$.subscribe((action) => {
      expect(action).toEqual(YoutubeAction.updateShowCards());
    });
    done();
  });
});
