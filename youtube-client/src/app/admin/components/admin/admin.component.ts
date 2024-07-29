import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { dateValidator } from '../../../shared/validators/dataValid';
import { urlValidator } from '../../../shared/validators/urlValid';
import { ICustomCard } from '../../models/customCard.model';
import * as CustomAction from '../../../redux/actions/custom.action';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  form = this.formBuilder.group({
    title: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        updateOn: 'blur',
      },
    ],
    description: [
      '',
      {
        validators: [Validators.maxLength(255)],
        updateOn: 'blur',
      },
    ],
    img: [
      '',
      {
        validators: [Validators.required, urlValidator],
        updateOn: 'blur',
      },
    ],
    link: [
      '',
      {
        validators: [Validators.required, urlValidator],
        updateOn: 'blur',
      },
    ],
    createDate: [
      this.startValueDate(),
      {
        validators: [Validators.required, dateValidator],
        updateOn: 'blur',
      },
    ],
    tags: this.formBuilder.array([
      this.formBuilder.control('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    ]),
  });

  startValueDate() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  getFormsControls(): FormArray {
    return this.form.controls.tags as FormArray;
  }

  addTags() {
    (<FormArray> this.form.controls.tags).push(
      this.formBuilder.control('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    );
  }

  deleteTag(index: number) {
    (<FormArray> this.form.controls.tags).removeAt(index);
  }

  checkLengthTags() {
    return this.form.controls.tags.length > 4;
  }

  reset() {
    this.form.reset({
      title: '',
      description: '',
      img: '',
      link: '',
      createDate: this.startValueDate(),
      tags: [''],
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      const card: ICustomCard = {
        videoLink: this.form.value.link || '',
        id: String(Date.now()),
        snippet: {
          title: this.form.value.title || '',
          publishedAt: this.form.value.createDate || '',
          description: this.form.value.description || '',
          thumbnails: {
            high: {
              url: this.form.value.img || '',
            },
          },
        },
        statistics: {
          viewCount: '0',
        },
      };

      this.store.dispatch(CustomAction.addCustomCard({ customCards: card }));

      this.reset();
    }
  }
}
