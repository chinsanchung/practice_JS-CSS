// const test = require('./test.json');
// JSON : 객체 혹은 배열

const startPrint = (data) => {
  switch(typeof data) {
    case('object'):
      printJson(data);
      break;
    case('array'):
      printArray(data);
      break;
    default:
      console.log(data);
  }
}

const printBoolean = (value) => {
  (value === true ? console.log(true) : console.log(false));
}

const printArray = (arr) => {
  for (const item of arr) {
    console.log(item);
  }
}
/* 아래처럼 축소가 가능함.
const printJson = (obj) => {
  for (const key in obj) {
    switch(typeof obj[key]) {
      case('array'):
        printArray(obj[key]);
        break;
      case('boolean'):
        printBoolean(obj[key]);
        break;
      case('object'):
        printJson(obj[key]);
        break;
      default:
        console.log(obj[key]);
    }
  }
} */
// 단순한 조건 (a>0)이면 else 없이도 가능하지만 여기서는 else 를 써야한다.
const printJson = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
		printJson(obj[key]);
    } else {
		console.log(obj[key]);	
	  }
  }
}

startPrint({ 'a': 1, 'b': {'c':2, 'd':3}, 'e': ['a','r','r'] });
// startPrint([1, 2]);
