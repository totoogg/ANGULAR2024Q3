import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const urlValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const isValidUrl = (str: string) => {
    try {
      return !!new URL(str);
    } catch (_) {
      return false;
    }
  };

  if (isValidUrl(control.value)) {
    return null;
  }
  return { urlValidator: true };
};
