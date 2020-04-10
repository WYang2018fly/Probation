const _ = require('lodash')

class Args {
  constructor(schema, cl) {
    this.schema = schema;
    this.cl = cl;
  }

  //是否符合规定的参数结构
  isSchema(schema, ary) {
    ary.forEach(item => {
      if (!schema.hasOwnProperty(item)) {
        console.log('error')
        throw new Error('The parameter format is incorrect');
      }
    })
  }

  // isUseDefault(index,clary,idxAry){
  //   //当前索引的后一项如果等于以idxAry为索引数组的下一项，说明此标记使用默认值
  //   return clary[index + 1] == clary[idxAry[index + 1]];  
  // }

  //是否使用缺省值
  useDefault(type, obj, item) {
    type === 'boolean' ? obj[item] = true : null;
    type === 'number' ? obj[item] = 0 : null;
    type === 'string' ? obj[item] = '' : null;
    type === 'list' ? obj[item] = [] : null;
    return;
  }

  //标记对应的值的形式：默认值、单个值及list
  isUseDefaultOrList(idxAry, idx) {
    //如果当前标记为最后一个标记，指的是记录标记索引数组的最后一项
    if (idx == idxAry.length - 1) return 0;
    //差值大于2表示该标记的值为list，等于2表示为单个值，等于1表示使用缺省值
    return idxAry[idx + 1] - idxAry[idx];
  }

  toArray(str) {
    let reg = /-[a-z]{1}/g;

    //和scheme参数结构对比
    // let str2 = str.replace(reg2,'');
    let schAry = str.match(reg).join(' ').replace(/-/g, '').split(' ');

    this.isSchema(this.schema, schAry);

    //获取到cl字符串的数组
    let clAry = str.split(' '),
      idxAry = [];

    clAry = clAry.map(item => {
      return /^-?\d+$/g.test(item) ? Number(item) : item;
    })
    // let clAry = str.replace(/-/g,'').split(' ');

    clAry.forEach((item, index) => {
      // String(item).includes('-') ? idxAry.push(index) : null;
      // String(item).split('')[0] == '-' && /^-[a-zA-Z_]/g.test(item) ? idxAry.push(index) : null;
      /^-[a-zA-Z_]/g.test(item) ? idxAry.push(index) : null;
    });

    return {
      //命令行数组
      clAry,
      //标记数组
      schAry,
      //标记在命令行中的索引组成的数组
      idxAry
    }

  }

  //判断当前标记下一项（即当前标记的值）的数据类型
  isType(next,obj,item,index,arys){
    if (/\d+,\d+/.test(next)) {
      obj[item] = next.split(',').map(item => {
        return Number(item);
      })
    } else if(/\w+,\w+/i.test(next)){
      obj[item] = next.split(',')
    }else{
      obj[item] = arys.clAry[arys.idxAry[index] + 1];
    }
  }

  Parse() {
    let obj = {};
    let arys = this.toArray(this.cl),
      len = arys.clAry.length;
    console.log(arys)
    // console.log(this.schema[arys.schAry[0]]);
    arys.schAry.forEach((item, index) => {
      //设置默认值
      if (this.isUseDefaultOrList(arys.idxAry, index) == 1) {
        this.useDefault(this.schema[item].type, obj, item);
      } else if (this.isUseDefaultOrList(arys.idxAry, index) == 2) {
        // if (this.schema[item].type === 'number') {
        //   obj[item] = Number(arys.clAry[arys.idxAry[index] + 1]);
        //   return;
        // }
        let nextItem = arys.clAry[arys.idxAry[index] + 1];
        // if (/\d+,\d+/.test(nextItem)) {
        //   obj[item] = nextItem.split(',').map(item => {
        //     return Number(item);
        //   })
        // } else if(/\w+,\w+/i.test(nextItem)){
        //   obj[item] = nextItem.split(',')
        // }else{
        //   obj[item] = arys.clAry[arys.idxAry[index] + 1];
        // }
        this.isType(nextItem,obj,item,index,arys);
      } else if (this.isUseDefaultOrList(arys.idxAry, index) > 2) { //列表类型的参数
        let _clAry = _.cloneDeep(arys.clAry);
        obj[item] = _clAry.splice(arys.idxAry[index] + 1, this.isUseDefaultOrList(arys.idxAry, index) - 1);
      } else { //已确定是最后一个标记，是否为clAry数组的最后一项,是则使用默认值,否则判断索引的位置是否为倒数第二个
        arys.idxAry[index] == len - 1 ? this.useDefault(this.schema[item].type, obj, item) :
          (arys.idxAry[index] == len - 2 ? this.isType(arys.clAry[len - 1],obj,item,index,arys) : obj[item] = arys.clAry.slice(arys.idxAry[index] + 1));

          //obj[item] = arys.clAry[len - 1]
      }
    })
    console.log(obj);
    return obj;
  }
}

module.exports = Args;