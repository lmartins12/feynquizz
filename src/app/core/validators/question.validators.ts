import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionDifficulty } from '../models';

export class QuestionValidators {
  static textValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return { required: true };
      }

      if (value.length < 10) {
        return { minlength: { requiredLength: 10, actualLength: value.length } };
      }

      return null;
    };
  }

  static difficultyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) {
        return { required: true };
      }

      const validDifficulties = Object.values(QuestionDifficulty);

      if (!validDifficulties.includes(value as QuestionDifficulty)) {
        return { invalidDifficulty: true };
      }

      return null;
    };
  }
}
