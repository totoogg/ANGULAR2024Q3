import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  OnDestroy,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map, Observable, Subscription, switchMap,
} from 'rxjs';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { VideosService } from '../../services/videos.service';
import * as AppSelectors from '../../../redux/selectors/app.selector';
import * as CustomAction from '../../../redux/actions/custom.action';
import * as FavoriteSelectors from '../../../core/store/selectors/core.selector';
import * as FavoriteActions from '../../../core/store/actions/core.action';
import { IItem } from '../../models/search-item.model';
import { ICustomCard } from '../../../admin/models/customCard.model';
import { IData } from '../../models/search-response.model';

const initialValue: IItem = {
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

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  private id = signal('');

  favorite$ = new Observable<string | undefined>();

  loading$ = this.store.select(AppSelectors.selectGetIsLoading);

  videoItem: IItem | undefined = undefined;

  customCard: ICustomCard | undefined = undefined;

  constructor(
    private router: Router,
    private location: Location,
    private activeRouter: ActivatedRoute,
    public videoService: VideosService,
    private store: Store,
  ) {
    effect(() => {
      if (!this.videoByIdStore() && !this.requestVideoByIdSignal()) {
        this.router.navigate(['notFound']);
      }
    }, { allowSignalWrites: true });
  }

  videoServiceVideoSubscription: Subscription | undefined;

  videoServiceGetByIdSubscription: Subscription | undefined;

  videoServiceVideoIdSubscription: Subscription | undefined;

  videoByIdStore: Signal<ICustomCard | IItem | undefined> = toSignal(
    this.store.select(AppSelectors.selectGetId(this.id())),
  );

  requestVideoByIdSignal = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.videoService.getById(id).pipe(map((el) => (el as IData).items[0]))),
    ),
    { initialValue },
  );

  videoComputed: Signal<ICustomCard | IItem | undefined | null> = computed(
    () => {
      if (this.videoByIdStore()) {
        if ('kind' in this.videoByIdStore()!) {
          this.videoItem = this.videoByIdStore() as IItem;
        }
        if ('videoLink' in this.videoByIdStore()!) {
          this.customCard = this.videoByIdStore() as ICustomCard;
        }
        return this.videoByIdStore();
      }

      this.videoItem = this.requestVideoByIdSignal() as IItem;

      return this.requestVideoByIdSignal();
    },
  );

  ngOnInit(): void {
    this.id.set(this.activeRouter.snapshot.paramMap.get('id') as string);

    /*  this.videoServiceVideoSubscription = this.store
      .select(AppSelectors.selectGetId)
      .subscribe((el) => {
        if (el) {
          this.videoService.changeVideo(el as IItem);
        } else {
          this.videoServiceGetByIdSubscription = this.videoService
            .getById(this.id)
            .subscribe();
          // this.videoServiceVideoIdSubscription = this.videoService.video$.subscribe((video) => {
          //   if (video === undefined) {
          //     this.router.navigate(['notFound']);
          //   }
          // });
          if (this.videoService.video$() === undefined) {
            this.router.navigate(['notFound']);
          }
        }
      }); */

    this.favorite$ = this.store.select(
      FavoriteSelectors.selectGetFavoriteId(this.id()),
    );
  }

  handleClickBack() {
    this.location.back();
  }

  randomDislike(str?: string) {
    if (str) {
      return Math.round(Number(str) / 100);
    }
    return 0;
  }

  handleClickButtonRemove() {
    this.store.dispatch(CustomAction.removeCustomCard({ id: this.id() }));
    this.handleClickBack();
  }

  handleClickButtonFavorite() {
    this.store.dispatch(
      FavoriteActions.toggleVideoInFavorite({ id: this.id() }),
    );
  }

  ngOnDestroy() {
    this.videoServiceVideoSubscription?.unsubscribe();
    this.videoServiceGetByIdSubscription?.unsubscribe();
    this.videoServiceVideoIdSubscription?.unsubscribe();
  }
}
