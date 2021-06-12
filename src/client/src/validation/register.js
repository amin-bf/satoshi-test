export const nameValidationRules = {
  name: {
    presence: {
      allowEmpty: false,
      message: "must be provided.",
    },
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: "is too short.",
      tooLong: "is too long.",
    },
    format: {
      pattern: /[a-zA-Z]{1,}/,
      flags: "i",
      message: "must only include alphabets.",
    },
  },
};

export const passwordValidationRules = {
  password: {
    presence: {
      allowEmpty: false,
      message: "must be provided.",
    },
    length: {
      minimum: 8,
      maximum: 100,
      tooShort: "is too short.",
      tooLong: "is too long.",
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$/,
      flags: "i",
      message:
        "must include alphanumeric and special characters (uppercase and lowercase).",
    },
    equality: "password_confirmation",
  },
};

export const ageValidationRules = {
  age: {
    presence: {
      allowEmpty: false,
      message: "must be provided.",
    },
    format: {
      pattern: /[0-9]{1,}/,
      message: "must be numeric and integer.",
    },
    numericality: {
      greaterThan: 10,
      lessThan: 150,
      onlyInteger: true,
    },
  },
};

export const scoreValidationRules = {
  score: {
    presence: {
      allowEmpty: false,
      message: "must be provided.",
    },
    format: {
      pattern: /[0-9.]{1,}/,
      message: "must be numeric.",
    },
    numericality: {
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 100,
    },
  },
};
