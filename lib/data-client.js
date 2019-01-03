const ApiClient = require('./api-client');
const Utils = require('./utils');
const isString = Utils.isString;
const toArrayString = Utils.toArrayString;
const isEmptyObject = Utils.isEmptyObject;

class DataClient extends ApiClient {
  constructor(options) {
    super(options);
  }

  municipalities(options) {
    if (!options) throw new Error('options must be present');

    if (options.ou) {
      throw new Error('not allowed to pass ou parameter to this method - please use ou method instead.');
    }

    const { id, municipality, ou, ...rest } = options;

    // allow passing id or municipality
    options = Object.assign(rest, { municipality: id || municipality });
    return this.fetch(this.url(options));
  }

  ou(options) {
    if (!options) throw new Error('options must be present');

    if (options.municipality) {
      throw new Error('not allowed to pass municipality parameter to this method - please use municipality method instead.');
    }

    const { id, ou, ...rest } = options;

    // allow passing id or ou
    options = Object.assign(rest, { ou: id || ou });
    return this.fetch(this.url(options, 'ou'));
  }

  // See https://github.com/Hypergene/kolada#query-data
  url(options, __type) {
    // Handle "all data" queries for ou and municipalities
    if (isString(options)) return this.allDataUrl(options)

    let { id, kpi, year, ou, municipality, fromDate } = options || {};
    const parts = [this.baseURL];
    const query = [];

    const validateOptions = options => {
      if (!options || isEmptyObject(options)) throw new Error('options can *not* be empty.');

      if (municipality || ou) {
        if (kpi || year) return
        throw new Error('when passing municipality or ou you need to pass kpi or year too.')
      }

      if (!kpi || !year) throw new Error('when leaving municipality and ou blank you need to pass both kpi and year.')
    }

    validateOptions(options)

    if (ou && municipality) {
      throw new Error('Passing both ou and municipality is not allowed.')
    } else if (ou || __type === 'ou') {
      parts.push('oudata');
    } else {
      parts.push('data');
    }

    if (id)           parts.push(`id/${toArrayString(id)}`);
    if (kpi)          parts.push(`kpi/${toArrayString(kpi)}`);
    if (ou)           parts.push(`ou/${toArrayString(ou)}`);
    if (municipality) parts.push(`municipality/${toArrayString(municipality)}`);
    if (year)         parts.push(`year/${toArrayString(year)}`);

    // TODO: Add validation for format YYYY-MM-DD
    if (fromDate) query.push(`from_date=${fromDate}`);

    return `${parts.join('/')}?${query.join('&')}`;
  }
}

module.exports = DataClient;
