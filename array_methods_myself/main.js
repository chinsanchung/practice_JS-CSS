// TODO: 01. 배열 메소드 forEach 를 직접 만들기
function forEachh (callback) {
  const arr = [...this];
  console.log(arr, this);
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
// call 로 this 를 [2,4,6,8]로 잡아둔 후 callback 을 실행.
// forEachh.call([2,4,6,8], (item, index) => console.log(item, index));

// TODO: 02. map 직접 만들어보기
function mapp(callback) {
  const arr = [...this];
  const newArr = [];
  for (const item of arr) {
    newArr.push(callback(item));
  }
  return newArr;
}
// mapp.call([2,4,6,8], item => item + 10);

// TODO: 03. filter 직접 만들어보기
function filterr(callback) {
  const arr = [...this];
  const newArr = [];
  for (const item of arr) {
    if(callback(item)) newArr.push(item);
  }
  return newArr;
}
// filterr.call([2,4,6,8], item => item > 5);

// TODO: 04. remove 직접 만들어보기
function remove(index) {
  const arr = [...this];
  arr.splice(index, 1);
  return arr;
}
// remove.call([2,4,6,8], 2);

// TODO: 05. shuffle 직접 만들어보기. 배열 항목들을 랜덤으로 섞음
/* function shuffle() {
//Set 은 될 때까지 반복해서 효율이 낮음. 또한 [1,1,2]일 경우 안됨
  const arr = [...this];
  const newArr = [];
  const set = new Set();
  while(set.size !== arr.length) {
    set.add(arr[Math.floor(Math.random() * arr.length)]);
  }
  newArr.push(...set);
  return newArr;
} */
// 출처: https://code.i-harness.com/ko-kr/q/25660a
function shuffle() {
  const arr = [...this];
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    /* es6 으로 두 변수 동시에 할당가능
    [arr[i], arr[j]] = arr[j], arr[i];
    */
  }
  return arr;
}
// shuffle.call([1,2,3,4,5]);

// TODO: 06. 배열 항목을 랜덤으로 가져오는 rand 구현하기.
function rand() {
  const arr = [...this];
  return arr[Math.floor(Math.random() * arr.length)];
}
// rand.call([1,2,3,4,5])

// TODO: 07. 배열 첫 항목을 가져오는 first 구현
function first() {
  const arr = [...this];
  return arr[0];
}
// first.call([1,2,3,4,5])
// TODO: 08. 배열 마지막 항목을 가져오는 last 구현
function last() {
  const arr = [...this];
  return arr[arr.length - 1];
}
// last.call([1,2,3,4,5])

// TODO: es6 스타일로 모듈화
/* export default {
  remove, shuffle, rand, first, last
} */
