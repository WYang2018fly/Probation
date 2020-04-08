var fizzBuzz = require('../fizzBuzz');
var expect = require('chai').expect;

describe("fizzBuzz's test",()=>{
  it("invalid situation",()=>{
    expect(fizzBuzz()).to.be.equal("Don't input null value");
    expect(fizzBuzz('one')).to.be.equal("please input Interger number");
    expect(fizzBuzz(-1)).to.be.equal("Don't input decimals or negative Numbers");
    expect(fizzBuzz(2.2)).to.be.equal("Don't input decimals or negative Numbers");
  })

  it("valid parameters",()=>{
    expect(fizzBuzz(3)).to.be.equal('Fizz');
    expect(fizzBuzz(5)).to.be.equal('Buzz');
    expect(fizzBuzz(13)).to.be.equal('Fizz');
    expect(fizzBuzz(75)).to.be.equal('FizzBuzz');
  })
  
  it("version 1.0's result",()=>{
    expect(fizzBuzz(23,1)).to.be.equal(23);
  })

  it("version 2.0's result",()=>{
    expect(fizzBuzz(23)).to.be.equal('Fizz');
  })
})