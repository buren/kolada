const Kolada = require('./index');

const fakeFetch = url => console.log(`GET ${url}`);
const kolada = new Kolada({ fetch: fakeFetch });
const expectInvalid = f => {
  try {
    f();
    console.log('[FAIL] Did *not* raise even though we expected it to.');
  } catch (e) {
    console.log('[SUCCESS] Raised on invalid data:', e.message);
  }
};

console.log('=== META ===');
kolada.meta.kpi({ id: ['N00945'] });
kolada.meta.kpiGroups({ title: 'Män' });
kolada.meta.kpiGroups();
kolada.meta.municipalities({ id: '1860' });
kolada.meta.municipalityGroups()
kolada.meta.ou({ municipality: ['1860'] });
console.log('=== DATA ===');
expectInvalid(_ => kolada.data.municipalities({ a: 1 }));
expectInvalid(_ => kolada.data.municipalities({ kpi: 'N00945' }));
expectInvalid(_ => kolada.data.municipalities({ ou: 'V15E144001301' }));
expectInvalid(_ => kolada.data.municipalities({ municipality: '1860' }));
expectInvalid(_ => kolada.data.municipalities({ year: 2009 }));
expectInvalid(_ => kolada.data.municipalities({ fromDate: '2015-01-29' }));
expectInvalid(_ => kolada.data.municipalities({ municipality: '1860', ou: 'V15E144001301' }));
kolada.data.municipalities({ kpi: 'N00945', year: 2008 });
kolada.data.municipalities({ municipality: '1860', kpi: 'N00945' });
kolada.data.municipalities({ municipality: '1860', year: 2008 });
kolada.data.municipalities({ municipality: '1860', kpi: 'N00945', year: '2008' });
kolada.data.municipalities({ municipality: '1860', year: 2009, fromDate: '2015-02-28' });
kolada.data.ou({ ou: 'V15E144001301', kpi: 'N00945', year: 2009 });
kolada.data.ou({ kpi: 'N15033', year: 2007 });
kolada.data.ou({ kpi: 'N00945', ou: 'V15E144001301' });
kolada.data.ou({ ou: 'V15E144001301', year: 2009 });
expectInvalid(_ => kolada.data.municipalities());
expectInvalid(_ => kolada.data.ou());
kolada.data.municipalities({ kpi: 'N00945', municipality: '1860' });
kolada.data.municipalities({ kpi: 'N00945', municipality: '1860', year: '2008' });
kolada.data.municipalities({ kpi: 'N00945', year: '2008' });
kolada.data.municipalities({ kpi: 'N00945', year: '2008', fromDate: '2019-01-01' });
