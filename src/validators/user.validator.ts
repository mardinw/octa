import validator = require("validator");

export class UserValidator {
  static validate(body, toValidate: string[]) {
    const errors: string[] = [];

    if (toValidate.includes('username') && validator.isEmpty(body.username)) {
      errors.push('Name cannot be empty');
    }

    if (
      toValidate.includes('password') &&
      validator.isEmpty(body.password)
    ) {
      errors.push('Password cannot be empty');
    }

    return errors;
  }
}
