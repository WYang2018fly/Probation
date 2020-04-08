//FizzBuzz 1.0
let checkout1 = (num) => {
  if (num % 15 == 0) {
    return 'FizzBuzz';
  } else if (num % 3 == 0) {
    return 'Fizz';
  } else if (num % 5 == 0) {
    return 'Buzz';
  } else {
    return num;
  }
}

//FizzBuzz 2.0
let hasNum = (num1, num2) => {
  return num1.toString().split('').some(item => {
    return item == num2
  })
}

let checkout2 = (num) => {
  if (num % 15 === 0) {
    return 'FizzBuzz';
  } else if (num % 3 == 0 || hasNum(num, 3)) {
    return 'Fizz';
  } else if (num % 5 == 0 || hasNum(num, 5)) {
    return 'Buzz';
  } else {
    return num;
  }
}


let fizzBuzz = (n, v = 2) => {
  // var reg = /^(\-|\+)? | (\.\d+)?$/;
  // let reg = /^(\.\d+)?$/;
  // let reg = /^-?\d+\.?\d$/;
  if (n == null) {
    return "Don't input null value";
  }
  if (typeof n === 'string') {
    return 'please input Interger number'
  }
  if (n.toString().indexOf('.') >= 0 || n < 0) {
    return "Don't input decimals or negative Numbers"
  }
  return v == 2 ? checkout2(n) : checkout1(n);
}

module.exports = fizzBuzz;