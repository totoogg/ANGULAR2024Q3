import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup, FormControl, Validators, FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [Validators.maxLength(255)]),
    img: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    createDate: new FormControl(this.startValueDate(), [
      Validators.required,
      this.dateValidator,
    ]),
    tags: new FormArray([new FormControl('', Validators.required)]),
  });

  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    const dateNow = new Date().getTime();
    const dateChoice = new Date(control.value).getTime();

    if (dateNow - dateChoice > 0) {
      return null;
    }
    return { dateValidator: true };
  }

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
