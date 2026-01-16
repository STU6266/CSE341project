// validators/filamentValidator.js

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function validateFilament(body) {
  const errors = [];

  // REQUIRED strings
  if (!isString(body.brand)) {
    errors.push({ field: 'brand', message: 'brand is required' });
  }
  if (!isString(body.material)) {
    errors.push({ field: 'material', message: 'material is required' });
  }
  if (!isString(body.color)) {
    errors.push({ field: 'color', message: 'color is required' });
  }

  if (!isNumber(body.nozzleTempMin)) {
    errors.push({ field: 'nozzleTempMin', message: 'nozzleTempMin is required and a number' });
  }

  if (!isNumber(body.nozzleTempMax)) {
    errors.push({ field: 'nozzleTempMax', message: 'nozzleTempMax is required and a number' });
  }

  if (!isNumber(body.bedTempMin)) {
    errors.push({ field: 'bedTempMin', message: 'bedTempMin is required and a number' });
  }

  if (!isNumber(body.bedTempMax)) {
    errors.push({ field: 'bedTempMax', message: 'bedTempMax is required and a number' });
  }

  if (isNumber(body.nozzleTempMin) && isNumber(body.nozzleTempMax) && body.nozzleTempMin > body.nozzleTempMax) {
    errors.push({ field: 'nozzleTemp', message: 'nozzleTempMin must be smaller than nozzleTempMax' });
  }

  if (isNumber(body.bedTempMin) && isNumber(body.bedTempMax) && body.bedTempMin > body.bedTempMax) {
    errors.push({ field: 'bedTemp', message: 'bedTempMin must be smaller than bedTempMax' });
  }

  return errors;
}

module.exports = { validateFilament };
