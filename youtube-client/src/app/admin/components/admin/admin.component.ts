import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { dateValidator } from '../../../shared/validators/dataValid';
import { urlValidator } from '../../../shared/validators/urlValid';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  constructor(
    private formBuilder: FormBuilder,
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
        validators: [Validators.required],
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
      new FormControl('', {
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
    });
    (<FormArray> this.form.controls.tags).clear();
    (<FormArray> this.form.controls.tags).push(
      new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    );
  }

  handleSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.reset();
    }
  }
}
