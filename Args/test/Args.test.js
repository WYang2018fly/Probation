const Args = require('../Args');
const Schema = require('../Schema');
const create = Schema.create;
const schema = Schema.schema;
const expect = require('chai').expect;
const should = require('chai').should();


describe("Args's test", () => {
  it("valid parameters", () => {
    expect(new Args(schema, '-l -p 8080 -d /usr/logo').Parse()).to.be.deep.equal({
      l: true,
      p: 8080,
      d: '/usr/logo'
    });

    expect(new Args(schema, '-p 8080 -d /usr/logo').Parse()).to.be.deep.equal({
      p: 8080,
      d: '/usr/logo'
    })

    expect(new Args(schema, '-l -p 8080 -d /usr/logo /etc').Parse()).to.be.deep.equal({
      l: true,
      p: 8080,
      d: ['/usr/logo', '/etc']
    })

    expect(new Args(schema, '-l -p 8080 430 20 -d /usr/logo /etc').Parse()).to.be.deep.equal({
      l: true,
      p: [8080, 430, 20],
      d: ['/usr/logo', '/etc']
    })

    expect(new Args(schema, '-l -p 8080 430 20 -d /usr/logo /etc -t 2020-04-08').Parse()).to.be.deep.equal({
      l: true,
      p: [8080, 430, 20],
      d: ['/usr/logo', '/etc'],
      t: '2020-04-08'
    })

    expect(new Args(schema, '-l -p 8080 430 20 -d /usr /logo /etc -t').Parse()).to.be.deep.equal({
      l: true,
      p: [8080, 430, 20],
      d: ['/usr/logo', '/etc'],
      t: ''
    })

    expect(new Args(create({
      l: 'boolean',
      p: 'number',
      d: 'string',
      g: 'string',
      f: 'number'
    }), '-l -p 8080 -d /usr/logo -g this is a list -f 1 2 -3 5').Parse()).to.be.deep.equal({
      l: true,
      p: 8080,
      d: '/usr/logo',
      g: ["this", "is", "a", "list"],
      f: [1, 2, -3, 5]
    })

    expect(new Args(create({
      l: 'boolean',
      p: 'number',
      u: 'list',
      d: 'string',
      g: 'string',
      q: 'list'
    }), '-l -p 8080 -u 23,123 -d /usr/logo -g this is a list -q this,for').Parse()).to.be.deep.equal({
      l: true,
      p: 8080,
      u: [23,123],
      d: '/usr/logo',
      g: ["this", "is", "a", "list"],
      q:["this","for"]
    })
  })



  it("invalid situation", () => {
    (() => new Args(schema, '-l -p 8080 430 20 -d /usr/logo /etc -k').Parse()).should.throw();
  })
})