// validators/brandValidator.js

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateBrand(body) {
  const errors = [];

  // REQUIRED
  if (!isString(body.name)) {
    errors.push({ field: 'name', message: 'name is required' });
  }

  if (!isString(body.country)) {
    errors.push({ field: 'country', message: 'country is required' });
  }

  if (!isString(body.website)) {
    errors.push({ field: 'website', message: 'website is required' });
  }

  return errors;
}

module.exports = { validateBrand };
