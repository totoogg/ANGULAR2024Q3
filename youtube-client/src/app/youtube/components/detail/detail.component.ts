import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service';
import { IItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  videoService = inject(VideosService);

  activeRouter = inject(ActivatedRoute);

  router = inject(Router);

  video!: IItem;

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id') as string;
    this.videoService.getAll();
    const item = this.videoService.getById(id);
    if (item) {
      this.video = this.videoService.getById(id) as IItem;
    } else {
      this.router.navigate(['notFound']);
    }
  }

  handleClickBack() {
    this.router.navigate(['main']);
  }
}
