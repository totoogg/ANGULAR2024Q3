import { createAction, props } from '@ngrx/store';
import { IItem } from '../../youtube/models/search-item.model';

export const updateYoutubePageNext = createAction(
  '[Main Page] Update Page Next',
  props<{ page: number; tokenPage: string }>(),
);

export const updateYoutubePagePrev = createAction(
  '[Main Page] Update Page Prev',
  props<{ page: number; tokenPage: string }>(),
);

export const updateYoutubeFailed = createAction(
  '[Main Page] Update Page Failed',
);

export const updateYoutubeVideos = createAction(
  '[Main Page] Update Youtube Videos',
  props<{ videos: IItem[] }>(),
);

export const updateShowCards = createAction(
  '[Main Page] Update Show Cards',
);

export const updateFullCards = createAction(
  '[Main Page] Update Full Cards',
  props<{ videos: IItem[] }>(),
);

export const searchYoutubeVideos = createAction(
  '[Main Page] Search Youtube Videos',
);
