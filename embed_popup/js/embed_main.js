//export 로 뺀 후 여기서 사용가능함
import { createElement, findEl } from './common';
/*
// 방법 1. 팝업을 미리 만들어두고 클릭 대마다 innerHTML 로 변경
window.addEventListener('message', e => {
    console.log(e.data);
    document.querySelector('.popup').innerHTML = e.data;
    document.querySelector('.popup').style.display = 'block';

    // document.querySelector('.wrap').appendChild(popup);
});

const closePopupHandler = () => {
  document.querySelector('.popup').style.display = "none";
}
// 팝업을 닫는 이벤트
document.addEventListener('click', e => {
  for (const item of e.path) {
    if (item.className === 'popup'){
      closePopupHandler();
      break;
    }
  }
});
*/

// 방법 2. 가상 DOM 에 넣었다가 누를 때 다시 띄움. 팝업 누르면 다시 가상 DOM 으로 이동
// 2-1 클래스 생성, 팝업 클릭해 닫을 때 가상 DOM 에 넣음
const docFragment = document.createDocumentFragment();

const popup = new class {
  constructor() {
    this.el = createElement('div', {class:'popup'});
    this.show = false;

    document.addEventListener('click', e => {
      const targetElement = findEl(e.path, 'class', 'popup');
      if (targetElement) this.closePopupHandler();
    });
  }
  openPopupHandler(e) {
    this.el.innerHTML = e.data;
    docFragment.appendChild(this.el);
  }
  closePopupHandler() {
    docFragment.appendChild(this.el);
  }
}
window.addEventListener('message', e => {
  popup.openPopupHandler(e);
  document.querySelector('.wrap').appendChild(docFragment);
});



// const el = createElement('div', { class:'popup' });
// 2-2 클래스 없이 팝업 생성 혹은 가상 DOM 에 넣기
/* window.addEventListener('message', e => {
  el.innerHTML = e.data;
  docFragment.appendChild(el);
  document.querySelector('.wrap').appendChild(docFragment);
});

const closePopupHandler = () => {
  docFragment.appendChild(el);
}
document.addEventListener('click', e => {
  for (const item of e.path) {
    if (item.className === 'popup') {
      closePopupHandler();
      break;
    }
  }
}) */