const fetch = require('cross-fetch');
const fetchJSON = url => fetch(url).then(response => response.json());

const url = 'https://api.kolada.se/v2/municipality?title=lund';
fetchJSON(url).then(json => console.log(json));
