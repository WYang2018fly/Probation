const Args = require('../Args');
const Schema = require('../Schema');
const create = Schema.create;
const schema = Schema.schema;

// const schema = {
//   l: {
//     type: 'boolean',
//     default: false
//   },
//   p: {
//     type: 'number',
//     default: 0
//   },
//   d: {
//     type: 'string',
//     default: ''
//   },
//   t: {
//     type: 'string',
//     default: ''
//   }
// }

let cli = '-l -p 8080 -d /usr/logo';

let cli2 = '-p 8080 -d /usr/logo';

let cli3 = '-l -p 8080 90 100 -d /usr/logo'

let cli4 = '-l -p 8080 90 100 -d /usr/logo /etc/src'

let cli5 = '-l -p 8080 90 100 -d'

let cli6 = '-l -p 8080 -d /usr/logo -g'

let cli7 = '-l -p 8080 -d /usr/logo -t 2020-04-08'

let cli8 = '-l -p 8080 -d /usr/logo -g this is a list -f 1 2 -3 5 9 20'

let cli9 = '-l -p 8080 -u 23,123 -d /usr/logo -g this is a list -f 1 2'

let cli10 = '-l -p 8080 -u 23,123 -d /usr/logo -g this is a list -q this,for'

// let arg = new Args(create({
//   l: 'boolean',
//   p: 'number',
//   d: 'string'
// }), cli)
// arg.Parse();

// let arg2 = new Args(schema, cli8);
// arg2.Parse();

// let arg3 = new Args(create({
//   l: 'boolean',
//   p: 'number',
//   d: 'string',
//   g: 'string',
//   f: 'number'
// }),cli8);

// arg3.Parse();

let arg4 = new Args(create({
  l: 'boolean',
  p: 'number',
  d: 'string',
  g: 'string',
  f: 'number',
  u: 'list',
  q:'list'
}),cli10);

arg4.Parse();