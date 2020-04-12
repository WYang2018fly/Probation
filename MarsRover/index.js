const MarsRover = require('./src/MarsRover');

let mr = new MarsRover();

let res = mr.execute('-100 -100\n50 50 N\nfr');
// let res2 = mr.execute('flfb'); //'51 51 N'
// let res3 = mr.execute('lfflbb');
// let res4 = mr.execute('');
// console.log(res2);
console.log(res);
console.log(mr);
