import { createAction, props } from '@ngrx/store';
import { IItem } from '../../youtube/models/search-item.model';

export const updateYoutubePageNext = createAction(
  '[Main Page] Update Page Next',
  props<{ page: number }>(),
);

export const updateYoutubePagePrev = createAction(
  '[Main Page] Update Page Prev',
  props<{ page: number }>(),
);

export const updateYoutubeFailed = createAction(
  '[Main Page] Update Page Failed',
);

export const updateYoutubeVideos = createAction(
  '[Main Page] Update Youtube Videos',
  props<{ videos: IItem[] }>(),
);

export const updateAllVideos = createAction(
  '[Main Page] Update All Videos',
  props<{ videos: object }>(),
);

export const updateAddVideos = createAction(
  '[Main Page] Update Add Videos',
  props<{ videos: object }>(),
);

export const updateTokenPrev = createAction(
  '[Main Page] Update Token Prev',
  props<{ token: string }>(),
);

export const updateTokenNext = createAction(
  '[Main Page] Update Token Next',
  props<{ token: string }>(),
);

export const updateTotalResult = createAction(
  '[Main Page] Update Total Result',
  props<{ total: number }>(),
);

export const updateShowVideos = createAction(
  '[Main Page] Update Show Videos',
);

export const searchYoutubeVideos = createAction(
  '[Main Page] Search Youtube Videos',
);
