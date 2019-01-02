const BASE_URL = 'https://api.kolada.se/v2';
const fetch = require('cross-fetch');

class ApiClient {
  constructor(options) {
    options = options || {}

    const defaultOptions = {
      baseURL: BASE_URL,
      fetch: fetch
    };

    options = Object.assign(defaultOptions, options);

    this.baseURL = options.baseURL;
    this.fetch = options.fetch;
  }
}

module.exports = ApiClient;
