import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { dateValidator } from '../../../shared/validators/dataValid';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', Validators.maxLength(255)],
    img: ['', Validators.required],
    link: ['', Validators.required],
    createDate: [this.startValueDate(), [Validators.required, dateValidator]],
    tags: this.formBuilder.array([
      this.formBuilder.control('', Validators.required),
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
      new FormControl('', Validators.required),
    );
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
      new FormControl('', Validators.required),
    );
  }

  handleSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
