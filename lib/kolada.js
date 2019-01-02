const MetaClient = require('./meta-client');
const DataClient = require('./data-client');

class Kolada {
  constructor(options) {
    this.meta = new MetaClient(options);
    this.data = new DataClient(options);
  }
}

module.exports = Kolada;
