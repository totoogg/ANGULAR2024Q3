import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordUpperLowValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const upper = String(control.value).toUpperCase()
    === String(control.value);
  const low = String(control.value).toLowerCase()
    === String(control.value);

  if (!upper && !low) {
    return null;
  }
  return { passwordUpperLowValidator: true };
};

export const passwordLetterNumberValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const regexpLetter = /\w+/;
  const regexpNumber = /\d+/;

  if (
    regexpLetter.test(String(control.value))
    && regexpNumber.test(String(control.value))
  ) {
    return null;
  }
  return { passwordLetterNumberValidator: true };
};

export const passwordSpecialValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const regexp = /!|@|\]|\?|#/gm;

  if (regexp.test(String(control.value))) {
    return null;
  }
  return { passwordSpecialValidator: true };
};
