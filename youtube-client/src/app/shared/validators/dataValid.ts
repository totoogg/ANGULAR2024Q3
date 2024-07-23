import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const dateNow = new Date().getTime();
  const dateChoice = new Date(control.get('createDate')?.value).getTime();

  if (dateNow - dateChoice > 0) {
    return null;
  }
  return { dateValidator: true };
};
