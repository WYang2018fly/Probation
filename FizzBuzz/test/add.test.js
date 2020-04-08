var add = require('../add.js');
var expect = require('chai').expect;

//测试套件
describe('加法函数的测试',function (){
  //测试用例
  it('1+1 equal 2',function(){
    expect(add(1, 1)).to.be.equal(2);
  });
})