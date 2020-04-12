const should = require('chai').should();
const MarsRover = require('../src/MarsRover');

describe("MarsRover's test",()=>{
  it("usage",()=>{
    let mr = new MarsRover();
    mr.execute('100 100\n50 50 N\nfr').should.eq('50 51 E');
    mr.execute('flfb').should.eq('51 51 N');
    mr.execute('lfflbb').should.eq('49 53 S');
  })

  it("success situation",()=>{
    new MarsRover().execute('5 5\n1 1 S\n').should.eq('1 1 S');
    new MarsRover().execute('30 30\n10 10 W\nflbf').should.eq('9 10 S');
    new MarsRover().execute('0 0\n0 0 W\nf').should.eq('0 0 W');
    new MarsRover().execute('0 0\n0 0 W\nb').should.eq('0 0 W');
    new MarsRover().execute('0 0\n0 0 W\nl').should.eq('0 0 S');
    new MarsRover().execute('0 0\n0 0 W\nr').should.eq('0 0 N');
  })

  it("invalid parameters",()=>{
    (()=> new MarsRover().execute('')).should.throw('Parameter Error');
    (()=> new MarsRover().execute(123)).should.throw('Parameter Error');
    (()=> new MarsRover().execute('aaa',123)).should.throw('Parameter Error');
    (()=> new MarsRover().execute('5 aa\n1 1 N\n')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('5 5\n1 1 123\n')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('5 5\n1 1 N\n123')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('5 5\n100 100 N\nlf')).should.throw('Unreasonable parameters');

    (()=> new MarsRover().execute('5\n1 1 N\nlf')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('5 5\n')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('-5 -5\n1 1 N\nlf')).should.throw('Type Error or Invalid Parameters');
    (()=> new MarsRover().execute('A A\n1 1 N\nlf')).should.throw('Type Error or Invalid Parameters');
    // (()=> new MarsRover().execute('-5 -5\n1 1 N\nlf')).should.throw('Unreasonable parameters');
  })

})