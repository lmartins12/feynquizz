import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class TopicValidators {
  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return { required: true };
      }

      if (value.length < 3) {
        return { minlength: { requiredLength: 3, actualLength: value.length } };
      }

      if (value.length > 50) {
        return { maxlength: { requiredLength: 50, actualLength: value.length } };
      }

      return null;
    };
  }

  static emphasisValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return { required: true };
      }

      if (value.length < 3) {
        return { minlength: { requiredLength: 3, actualLength: value.length } };
      }

      if (value.length > 50) {
        return { maxlength: { requiredLength: 50, actualLength: value.length } };
      }

      return null;
    };
  }
}
