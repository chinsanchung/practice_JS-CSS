//key
const startKey = (data) => {
  let result = '';
  if (typeof data === 'object') {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        for (const key2 in data[key]) {
          result += key2;
        }
      }
      result += key;
    }
  }
  return result;
}

// value start
const startValue = (data) => {
  let result = '';
  switch(typeof data) {
    case('object'):
      result += printJson(data);
      break;
    case('array'):
      result += printArray(data);
      break;
    default:
      result += data;
  }
  return result;
}

const printBoolean = (value) => {
  let text = '';
  (value === true ? text += 'true' : text += 'false');
  return text;
}

const printArray = (arr) => {
  let text = ''
  for (const item of arr) {
    text += item;
  }
  return text;
}

const printJson = (obj) => {
  let text = ''
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      printJson(obj[key]);
    } else {
      text += obj[key];
    }
  }
  return text;
}
// value end

const checkValues = (val1, val2) => {
  if ((typeof val1 === 'object') && (typeof val2 === 'object')) {
    let result1 = startKey(val1) + startValue(val1);
    let result2 = startKey(val2) + startValue(val2);
    (result1 === result2 ? console.log('OK') : console.log('False'));
  }
}

checkValues({a: 1, b: {c: 1, d: 2}}, {a: 1, b: {c: 1, d: 2}});