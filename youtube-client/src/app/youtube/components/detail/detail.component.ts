import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { VideosService } from '../../services/videos.service';
import * as AppSelectors from '../../../redux/selectors/app.selector';
import * as CustomAction from '../../../redux/actions/custom.action';
import { IItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  private id: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private activeRouter: ActivatedRoute,
    public videoService: VideosService,
    private store: Store,
  ) {}

  videoServiceVideoSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id') as string;
    this.videoServiceVideoSubscription = this.store
      .select(AppSelectors.selectGetId)
      .subscribe((el) => {
        if (el) {
          this.videoService.changeVideo(el as IItem);
        } else {
          this.videoService.getById(this.id).subscribe();
          this.videoService.video$.subscribe((video) => {
            if (video === undefined) {
              this.router.navigate(['notFound']);
            }
          });
        }
      });
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

  ngOnDestroy() {
    this.videoServiceVideoSubscription?.unsubscribe();
  }
}
