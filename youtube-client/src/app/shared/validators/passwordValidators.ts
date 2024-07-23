import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordUpperLowValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const upper = String(control.get('password')?.value).toUpperCase()
    === String(control.get('password')?.value);
  const low = String(control.get('password')?.value).toLowerCase()
    === String(control.get('password')?.value);

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
    regexpLetter.test(String(control.get('password')?.value))
    && regexpNumber.test(String(control.get('password')?.value))
  ) {
    return null;
  }
  return { passwordLetterNumberValidator: true };
};

export const passwordSpecialValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const regexp = /!|@|\]|\?|#/gm;

  if (regexp.test(String(control.get('password')?.value))) {
    return null;
  }
  return { passwordSpecialValidator: true };
};
