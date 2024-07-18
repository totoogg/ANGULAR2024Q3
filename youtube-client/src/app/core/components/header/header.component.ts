import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IFind } from '../../../shared/models/IFind';
import { ISort } from '../../../shared/models/ISort';
import { VideosService } from '../../../youtube/services/videos.service';
import { FindService } from '../../services/find.service';
import { FindWordService } from '../../services/find-word.service';
import { SortVideoService } from '../../services/sort-video.service';
import { LoginService } from '../../../auth/services/login.service';
import { SliceTitlePipe } from '../../../youtube/pipes/slice-title.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, SliceTitlePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  videoService = inject(VideosService);

  findService = inject(FindService);

  findWordService = inject(FindWordService);

  sortVideoService = inject(SortVideoService);

  router = inject(Router);

  loginService = inject(LoginService);

  value = '';

  extraValue = '';

  showSort = false;

  handleClickSortDate() {
    const sort: ISort = {
      activeSortDate: this.sortVideoService.sort.activeSortDate,
      ascDate: this.sortVideoService.sort.ascDate,
      descDate: this.sortVideoService.sort.descDate,
      activeSortView: this.sortVideoService.sort.activeSortView,
      ascView: this.sortVideoService.sort.ascView,
      descView: this.sortVideoService.sort.descView,
    };

    if (this.sortVideoService.sort.activeSortDate) {
      sort.ascDate = !sort.ascDate;
      sort.descDate = !sort.descDate;
    }

    sort.activeSortDate = true;
    sort.activeSortView = false;
    this.sortVideoService.changeSortOption(sort);
  }

  handleClickSortView() {
    const sort: ISort = {
      activeSortDate: this.sortVideoService.sort.activeSortDate,
      ascDate: this.sortVideoService.sort.ascDate,
      descDate: this.sortVideoService.sort.descDate,
      activeSortView: this.sortVideoService.sort.activeSortView,
      ascView: this.sortVideoService.sort.ascView,
      descView: this.sortVideoService.sort.descView,
    };

    if (this.sortVideoService.sort.activeSortView) {
      sort.ascView = !sort.ascView;
      sort.descView = !sort.descView;
    }

    sort.activeSortDate = false;
    sort.activeSortView = true;
    this.sortVideoService.changeSortOption(sort);
  }

  handleShowSort() {
    this.showSort = !this.showSort;
    if (!this.showSort) {
      this.extraValue = '';
      this.handleInputWord();
    }
  }

  handleFind() {
    if (this.value && this.findService.start) {
      const obj: IFind = {
        value: this.value,
        start: !this.findService.start,
      };
      this.findService.changeOption(obj);
    }
    if (!this.findService.start) {
      const obj: IFind = {
        value: this.value,
        start: this.findService.start,
      };
      this.findService.changeOption(obj);

      if (this.value.trim().length > 2) {
        this.videoService.loadingChange(true);
        this.videoService.getAll(this.value.trim()).subscribe(() => {
          this.videoService.loadingChange(false);
        });
      }

      this.router.navigate(['main']);
    }
  }

  handleInputWord() {
    this.findWordService.changeWord(this.extraValue);
  }

  handleClickLogout() {
    this.loginService.userLogout();
  }

  handleClickLogin() {
    this.router.navigate(['login']);
  }

  handleClickLogo() {
    this.router.navigate(['main']);
  }
}
