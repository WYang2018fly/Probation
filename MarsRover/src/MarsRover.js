const _ = require('lodash');

class MarsRover {
  /**
   * create a MarsRover
   * @constructor 
   */
  constructor() {
    this.area = { X: 0, Y: 0 },
    this.landingSite = { x: 0, y: 0},
    this.direction = '',
    this.state = '';
    this.rules = [];
    this.actionRules = {};
    this.stateIterator = null;
  }

  /**
   * create stateIterator
   */
  *stateGenerator() {
    yield 'init';
    yield 'landed';
  }

  /**
   * Create rules for entering commands
   */
  createRules() {
    return [
      {
        X: 'number',
        Y: 'number'
      },{
        x: 'number',
        y: 'number'
      },
      {
        direction: 'string'
      },
      {
        actions: 'string'
      }
    ]
  }

  /**
   * Judge whether to go out of bounds
   */
  isOutRange(){
    return this.landingSite.x >= this.area.X || this.landingSite.y >= this.area.Y;
  }

  /**
   * Create rules for rover movement
   */
  createActionRules(){
    return {
      N:{
        f:()=> {if(!this.isOutRange()){ this.landingSite.y++}},
        b:()=> {if(!this.isOutRange()){ this.landingSite.y--}},
        l:()=> this.direction = 'W',
        r:()=> this.direction ='E'
      },
      S:{
        f:()=> {if(!this.isOutRange()){ this.landingSite.y--}},
        b:()=> {if(!this.isOutRange()){ this.landingSite.y++}},
        l:()=> this.direction = 'W',
        r:()=> this.direction ='E'
      },
      W:{
        f:()=> {if(!this.isOutRange()){ this.landingSite.x--;}},
        b:()=> {if(!this.isOutRange()){ this.landingSite.x++}},
        l:()=> this.direction = 'S',
        r:()=> this.direction = 'N'
      },
      E:{
        f:()=> {if(!this.isOutRange()){ this.landingSite.x++}},
        b:()=> {if(!this.isOutRange()){ this.landingSite.x--}},
        l:()=> this.direction = 'N',
        r:()=> this.direction = 'S'
      }
    }
  }

  /**
   * Mars rover status initialization
   */
  init(){
    this.stateIterator = this.stateGenerator();
    this.changeState();
    this.rules = this.createRules();
    this.actionRules = this.createActionRules();
  }

  /**
   * Detects whether the string contains numbers
   * @param {String} - value 
   */
  isNumber(value){
    return /^\d+$/.test(value) ;
  }  

  /**
   * Parse Command 
   * @param {String} - command
   * @return {Object|String} - parsedCommand 
   */
  parse(command) {
    let ary = command.split(/\n/).map(item => {
      return item.split(' ');
    }).reduce((total, current) => {
      return total.concat(current)
    }, [])
    


    let parsedCmd = this.state === 'init' ? this.formatData(ary) : command;
    return parsedCmd; 
  }

  /**
   * Format the input command
   * @param {Array} - cmdAry 
   * @return {Object} - formatCmd
   */
  formatData(cmdAry){
    let obj = Object.assign(..._.cloneDeep(this.rules));
    let keys = Object.keys(obj);
    let formatedCmd = {};

    cmdAry.forEach((item,index)=>{
      formatedCmd[keys[index]] = this.isNumber(item) ? parseInt(item) : item;
    })
    return formatedCmd;
  }

  /**
   * Data detection
   * @param {Array} - rules
   * @param {Object} - cmd
   */
  checkType(cmd){
    let obj = Object.assign(..._.cloneDeep(this.rules));
    let keys = Object.keys(obj);

    for(let value of keys){
      if(typeof cmd[value]!== obj[value] || (cmd.actions !== '' && cmd[value] === '')){
        throw new Error('Type Error or Invalid Parameters');
      }
    }
    
    if(cmd[keys[0]] < cmd[keys[2]] || cmd[[keys[1]]] < cmd[keys[3]]){
      throw new Error('Unreasonable parameters');
    }
  }

  /**
   * Write the command into the parameter of the rover.
   * @param {Object} parsedCmd 
   */
  writeCommand(parsedCmd) {
    if(this.state === 'init'){
      this.checkType(parsedCmd);
      this.area.X = parsedCmd.X;
      this.area.Y = parsedCmd.Y;
      this.landingSite.x = parsedCmd.x;
      this.landingSite.y = parsedCmd.y;
      this.direction = parsedCmd.direction;
      this.actions = parsedCmd.actions;
      this.changeState();
    }else{
      this.actions = parsedCmd;
    }
  }

  /**
   * Movement and Change Direction of Rover
   * @param {String} - actions
   * @param {Object} - actionRules
   */
  action(actions,actionRules){
    let actionList = actions.split('');
    for(let value of actionList){
      actionRules[this.direction][value]();
    } 
  }

  /**
   * Action of Rover
   */
  toAction(){
    this.action(this.actions,this.actionRules);  
  }

  /**
   * Get Position of Rover
   */
  getPosition(){
    return `${this.landingSite.x} ${this.landingSite.y} ${this.direction}`;
  }

  /**
   * Change State of Rover
   */
  changeState(){
    this.state = this.stateIterator.next().value;
  }

  /**
   * excute command
   * you can input parameters like this:
   * - '100 100\n50 50 N\nlf'
   * - first input '5 5\n1 1 E' than input 'lf'
   * @param {String} - command
   * @return {String} - position
   */
  execute(command) {
    if(command ==='' ||typeof command !== 'string' || arguments.length > 1) throw new Error('Parameter Error')
    if(!this.state) this.init();
    
    let parsedCmd = this.parse(command);  
    this.writeCommand(parsedCmd);

    this.toAction();
    
    let position = this.getPosition();
    return position;
  }
}

module.exports = MarsRover;
