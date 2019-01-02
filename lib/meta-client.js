const ApiClient = require('./api-client');
const toArrayString = require('./utils').toArrayString;
const isEmptyObject = require('./utils').isEmptyObject;

const ENTITIES = [
  'kpi', 'kpi_groups', 'municipality', 'municipality_groups', 'ou'
];
const encode = encodeURIComponent;

class MetaClient extends ApiClient {
  constructor(options) {
    super(options);
  }

  kpi(options) {
    return this.fetch(this.url('kpi', options));
  }

  kpiGroups(options) {
    return this.fetch(this.url('kpi_groups', options));
  }

  municipalities(options) {
    return this.fetch(this.url('municipality', options));
  }

  municipalityGroups(options) {
    return this.fetch(this.url('municipality_groups', options));
  }

  ou(options) {
    return this.fetch(this.url('ou', options));
  }

  // See https://github.com/Hypergene/kolada#metadata
  // Routes
  //   /:entity/:id
  //   /:entity/:id1,:id2
  //   /:entity?title=
  //   /:entity?municipality=
  url(entity, options) {
    if (!ENTITIES.includes(entity)) {
      throw new Error(`entity must be present and one of ${ENTITIES.join(' ')}.`);
    }

    let { id, title, municipality } = options || {};

    const idPath = id ? `/${toArrayString(id)}` : '';
    const query = [];
    if (municipality) query.push(`municipality=${toArrayString(municipality)}`);
    if (title)        query.push(`title=${encode(title)}`)

    return `${this.baseURL}/${entity}${idPath}?${query.join('&')}`;
  }
}

module.exports = MetaClient;
