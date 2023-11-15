const qs = require('qs');
const queryString = require('query-string');

let d = "foo[0]=1&foo[1]=2&foo[3]=3";

console.dir(qs.parse(d));
console.dir(queryString.parse(d));