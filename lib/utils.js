const toArrayString = o => Array.isArray(o) ? o.join(',') : o
const isEmptyObject = o => Object.keys(o).length === 0 && o.constructor === Object
const isString = o => typeof o === 'string' || o instanceof String;

module.exports = {
  toArrayString: toArrayString,
  isEmptyObject: isEmptyObject,
  isString: isString
};
