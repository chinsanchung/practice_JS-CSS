class DragElement {
  // 1121: 한번만 이벤트 실행..동적으로 추가 x
  constructor(el, obj) {
    this.el = el;
    this.obj = obj;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;

    this.deltaX = 0;
    this.deltaY = 0;
    this.startX = 0;
    this.startY = 0;
    this.isClick = false;
    el.addEventListener('mousedown', e => this.dragMouseDown(e));
    /* 1121: 밑의 두 개를 document 로 하는 이유는 해당 요소를 벗어나면 실행이 안되기 때문. */
    // 1121: 생성자에서 실행하지 않으면 클릭할 때마다 생성.
    document.addEventListener('mouseup', e => this.closeDragElement(e));
    // 1121: 현재 문서에 대기만 해도 이벤트 발생
    document.addEventListener('mousemove', e => this.elementDrag(e));

    this.inputedX = 0;
    this.inputedY = 0;
    for (const key in obj) {
      // 1122: key 는 문자열. 인수를 obj[key]로 해줘야함
      if(key === 'range') this.checkObject(obj[key]);
    }

  }

  dragMouseDown(e) {
    e.preventDefault();
    console.log('down');
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.isClick = true;
  }
  //
  checkObject(obj) {
    this.left = obj.x;
    this.top = obj.y;
    this.width = obj.w;
    this.height = obj.h;
    this.inputedX = obj.x;
    this.inputedY = obj.y;
  }
  // FIXME: 드래그 이동이 마우스 포인터 값의 두 배로 이동하는 문제.
  elementDrag(e) {
    if (!this.isClick) return;
    e.preventDefault();
    const obj = this.obj;

    // 1121: this 에서 가져온 값은 원시값..수정하면 원본이 바뀜..객체(생성자) 안의 값은 안바뀐다.
    // 1121: const { el, pos1, pos2, pos3, pos4 } = this; 
    // 1121: el 은 객체라서 const {el} = this 는 가능함.
    const { el } = this;
    this.deltaX = this.startX - e.clientX;
    this.deltaY = this.startY - e.clientY;
    this.startX = e.clientX;
    this.startY = e.clientY;

    
    // this.top -= this.deltaY;
    // this.left -= this.deltaX;
    // el.style.left = `${this.left}px`;
    // el.style.top = `${ this.top }px`;
    
    /* 1121: offset 은 도형에서 복잡한 계산으로 처리한 값이라 만약 도형이 많을 경우 느려질 수 있다. 도형에서 말고 
    dragElement 에서 드래그에 대한 모든 기능들을 처리하도록 만들어줘야함 */
    this.left -= this.deltaX; // 1122: 무조건 발생할 일
    this.top -= this.deltaY;

    console.log(this.top);
    console.log(this.left);
    /* 1122: 지정한 영역 이외에는 이동이 불가능하도록 조건 지정...따로 메소드로 뺄 수도 있음..
       무조건 발생할 일은 else 로 할 필요가 없다. 에어비엔비의 if 문 작성법을 다시 봐보기 */
    if (this.top > this.height + this.inputedY) this.top = this.height + this.inputedY;
    if (this.top < this.inputedY) this.top = this.inputedY;
    if (this.left > this.width + this.inputedX) this.left = this.width + this.inputedX;
    if (this.left < this.inputedX) this.left = this.inputedX;
    
/*  // 1122: 이 문장 x 2를 위의 네 문장으로 압축이 가능하다.
    if (this.left > (this.width + this.inputedX)) {
      this.left = this.width + this.inputedX;
    } else if (this.left < this.inputedX) {
      this.left = this.inputedX;
    } else if ((this.left <= (this.width + this.inputedX)) || (this.left >= this.inputedX)) {
      this.left -= this.deltaX;
    } */

    // 1122: 분기마다 style 을 일일히 넣지 않고 최종적으로만 넣음
    el.style.left = `${this.left}px`;
    el.style.top = `${ this.top }px`;
  }

  closeDragElement() {
    console.log('close');
    this.isClick = false;
  }
}

new DragElement(document.querySelector('.rec-1'), {
  range: {
    x: 50,
    y: 50,
    w: 300,
    h: 500,
}});
// new DragElement(document.querySelector('.rec-2'));