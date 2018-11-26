const purple = document.querySelector('.purple');
const green = document.querySelector('.green');

//assign 을 사용해서 클래스 생성자 만들기
class Test {
  constructor(params = {
    el, sx, ex, speed: 60, stop_x: false
  }) {
    Object.assign(this, params)
    console.log(this);
  }
}
// const test = new Test({speed:60, stop_x:false});
// test.el = 1
// test 는 Test {speed: 60, stop_x: false, el: 1}

class Move {
  constructor(el, sx, ex) {
    this.el = el;
    this.sx = sx;
    this.ex = ex;
//메소드에서 사용할 변수. 클래스 밖에서 객체로 만들어서 연결할 필요는 없다
    this.speed = 60;
    this.stop_x = false;
//생성자는 클래스 인스턴스화(생성)하자마자 바로 호출된다. 정의하자
    this.animate();
  }

  animate() {
    const { el, sx, ex } = this;
    this.stop_x = false;
    console.log(`sx ${sx}, ex ${ex}`);
    const x_dir = sx - ex > 0 ? -1 : 1;

    const loop = i => {
      el.setAttribute('style', `left:${i}px;`);
      if((this.stop_x !== true) && (i !==ex)) setTimeout(loop, this.speed, i + x_dir);
    }
    loop(sx);
  };

  stop() {
    this.stop_x = true;
  };
}
//익명함수에 인스턴스 생성해서 그 인스턴스를 변수에 저장함
const animate = (el, sx, ex) => new Move(el, sx, ex);
//const aaa = animate(purple, 0, 100);
//aaa.move();

//setInterval 로 애니메이션 동작
const interval_animation = (el, sx, ex, sy, ey) => {
  const x_dir = sx - ex > 0 ? -1 : 1;
  const y_dir = sy - ey > 0 ? -1 : 1;
  const move = () => {
    // console.log(`before x:${sx} y:${sy}`);
    if((sx === ex) && (sy === ey)) {
      clearInterval(timer);
    } else {
      sx += x_dir;
      sy += y_dir;
      el.style.left = sx + 'px';
      el.style.top = sy + 'px';
      // el.setAttribute('style', `left:${sx}px;top:${sy}px;`);
      // console.log(`after x:${sx} y:${sy}`);
    }
  }
  let timer = setInterval(move, 50);
}

// setTimeout 으로 애니메이션 동작
const timeout_animation = (el, sx, ex, sy, ey) => {
  const x_dir = sx - ex > 0 ? -1 : 1;
  const y_dir = sy - ey > 0 ? -1 : 1;
  const loop = (i, j) => {
    el.setAttribute('style', `left:${i}px;top:${j}px;`);
    if ((i !== ex) && (j !== ey)) setTimeout(loop, 1, i + x_dir, j + y_dir);
    // 새로 나온 requestAnimationFrame 으로 작성하기
    // if ((i !== ex) && (j !== ey)) requestAnimationFrame(() => loop(i + x_dir, j + y_dir));
    // console.log(`i : ${i}, j: ${j}`);
  };
  loop(sx, sy);
};


//interval_animation(purple, 100, 0, 100, 0);

//const move = new Move(purple, 0, 100);

/*
move 변수에 animate 함수를 실행시키고,
move 변수만으로 클래스의 stop 메소드를 실행할 수 있도록 함.
이걸로 여러 그림을 만들어도 각각 이동시키고 멈출 수 있게 됨*/
//const purple_move = animate(purple, 0, 500);
//const green_move = animate(green, 0, 300);
// move.stop();
/*
옛날의 생성자 함수 + 프로토타입으로 만들어보기
function Move(el, sx, ex) {
  this.el = el;
  this.sx = sx;
  this.ex = ex;

  this.speed = 60;
  this.stop_x = false;
}
Move.prototype.animate = function() {
  const { el, sx, ex } = this;
  this.stop_x = false;
  console.log(`sx ${sx}, ex ${ex}`);
  const x_dir = sx - ex > 0 ? -1 : 1;

  const loop = i => {
    el.setAttribute('style', `left:${i}px;`);
    if((this.stop_x !== true) && (i !==ex)) setTimeout(loop, this.speed, i + x_dir);
  };
  loop(sx);
};
Move.prototype.stop = function() {
  this.stop_x = true;
}
const move1 = new Move(purple, 0, 100);
*/

