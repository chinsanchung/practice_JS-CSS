//만들기
const main = document.querySelector('.main');
class Timer {
  constructor() {
    this.settingHTML('timer second-0');
  }
  createEl(className, locate, num) {
    const el = document.createElement('div');
    el.setAttribute('class', `${className}-${locate}`);
    el.innerHTML = `<div class="${locate}"><div class="number">${num}</div></div>`
    // upper.appendChild(el);
  }
  settingHTML(name) {
    const { createEl } = this;
    const elem = document.createElement('div');
    elem.setAttribute('class', name);
    const flipNumber = document.createElement('div');
    flipNumber.setAttribute('class', 'flip-number');
    createEl('front', 'top', 0);
    createEl('front', 'bottom', 0);
    createEl('back', 'top', 1);
    createEl('back', 'bottom', 1);
    elem.appendChild(flipNumber);
    main.appendChild(elem);
  }
  changeNumber(target) {

  }
  //화면 바꾸는 핸들러
  flipHandler(target) {
    console.log('FLIP!');
    const frontTop = document.querySelector(`.${target} .front-top`);
    const backBottom = document.querySelector(`.${target} .back-bottom`);
    frontTop.velocity({
      transform: ['rotateX(180deg)', 'rotateX(0deg)']
    });
    backBottom.velocity({
      transform: ['rotateX(0deg)', 'rotateX(180deg)']
    });
  }
  startTimer() {

  }
}

