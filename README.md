# Kolada API client

> Kolada API client provides access to standardized key performance indicators (KPI) concerning Swedish municipalities and organizational units.

:link: For a detailed API description, please see [github.com/Hypergene/kolada](https://github.com/Hypergene/kolada).

## Getting started

```
npm install --save kolada
```

There are two main parts to the API metadata and actual data ([see full API documentation](https://github.com/Hypergene/kolada)).

Initialize
```javascript
const Kolada = require('kolada');
const kolada = new Kolada();
```

All methods uses `fetch` under the hood
```javascript
kolada.meta.kpi()
  .then(res => res.json())
  .then(json => console.log(json))
```

If passed "impossible" arguments an exception will be raised (with detailed error messages)
```javascript
kolada.data.municipalities({ municipality: '1860' })
// Error: when passing municipality or ou you need to pass kpi or year too.
```

:information_source: The arguments: `municipality`, `ou`, `kpi` and `year` can either be strings or an array of strings.

__Meta data__

KPI(s)
```javascript
kolada.meta.kpi() // all
kolada.meta.kpi({ id: ['N00945'] })

kolada.meta.kpiGroups() // all
// title search string (automatically uri-encoded)
kolada.meta.kpiGroups({ title: 'kostnad' })
```

Municipalities
```javascript
kolada.meta.municipalities()
kolada.meta.municipalities({ id: ['1860'] })
kolada.meta.municipalityGroups()
```

Organizational Unit (OU)
```javascript
kolada.meta.ou({ municipality: ['1860'] })
```

__Data__

Municipalities
```javascript
kolada.data.municipalities({ kpi: 'N00945', year: 2008 })
kolada.data.municipalities({ municipality: '1860', year: [2008, 2009] })
kolada.data.municipalities({ municipality: '1860', year: 2009, fromDate: '2015-02-28' })
```

Organizational Unit (OU)
```javascript
kolada.data.ou({ kpi: ['N15033'], year: [2007, 2008] });
kolada.data.ou({ ou: 'V15E144001301', kpi: 'N00945', year: 2009 });
```

:link: For detailed API documentation, see [github.com/Hypergene/kolada](https://github.com/Hypergene/kolada).

## Development

```
git clone https://github.com/buren/kolada
cd kolada
```

Install dependencies
```
npm install
```

Run kitchen sink (a.k.a the quasi test suite)
```
npm run kitchen-sink
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buren/kolada.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
