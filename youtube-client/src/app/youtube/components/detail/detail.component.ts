import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { VideosService } from '../../services/videos.service';
import * as AppSelectors from '../../../redux/selectors/app.selector';
import * as CustomAction from '../../../redux/actions/custom.action';
import * as FavoriteSelectors from '../../../core/store/selectors/core.selector';
import * as FavoriteActions from '../../../core/store/actions/core.action';
import { IItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  private id: string = '';

  favorite$ = new Observable<string | undefined>();

  loading$ = this.store.select(AppSelectors.selectGetIsLoading);

  constructor(
    private router: Router,
    private location: Location,
    private activeRouter: ActivatedRoute,
    public videoService: VideosService,
    private store: Store,
  ) {}

  videoServiceVideoSubscription: Subscription | undefined;

  videoServiceGetByIdSubscription: Subscription | undefined;

  videoServiceVideoIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id') as string;
    this.videoServiceVideoSubscription = this.store
      .select(AppSelectors.selectGetId)
      .subscribe((el) => {
        if (el) {
          this.videoService.changeVideo(el as IItem);
        } else {
          this.videoServiceGetByIdSubscription = this.videoService.getById(this.id).subscribe();
          this.videoServiceVideoIdSubscription = this.videoService.video$.subscribe((video) => {
            if (video === undefined) {
              this.router.navigate(['notFound']);
            }
          });
        }
      });
    this.favorite$ = this.store.select(
      FavoriteSelectors.selectGetFavoriteId(this.id),
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
    this.store.dispatch(CustomAction.removeCustomCard({ id: this.id }));
    this.handleClickBack();
  }

  handleClickButtonFavorite() {
    this.store.dispatch(
      FavoriteActions.toggleVideoInFavorite({ id: this.id }),
    );
  }

  ngOnDestroy() {
    this.videoServiceVideoSubscription?.unsubscribe();
    this.videoServiceGetByIdSubscription?.unsubscribe();
    this.videoServiceVideoIdSubscription?.unsubscribe();
  }
}
