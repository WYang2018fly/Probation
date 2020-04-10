const create = (o)=>{
  for(let item in o){
    let value = o[item];
    o[item] = {}
    o[item]['type'] = value; 
  }

  return o;
}

const schema = {
  l: {
    type: 'boolean',
    default: false
  },
  p: {
    type: 'number',
    default: 0
  },
  d: {
    type: 'string',
    default: ''
  },
  t:{
    type: 'string',
    default: ''
  },
  g:{
    type:'string',
    default:''
  },
  f:{
    type: 'number',
    default: 0
  }
}

// module.exports = schema;
module.exports = {
  create,
  schema
};