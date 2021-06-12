export const updateObject = (object, update) => {
  return {
    ...object,
    ...update,
  };
};

export const convert422ErrorToObject = (errors) => {
  const errorsObject = {};
  errors.forEach((error) => {
    errorsObject[error.field] = error.message;
  });
  return errorsObject;
};
