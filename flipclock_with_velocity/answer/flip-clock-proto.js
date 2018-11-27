import createElement from './create-element';
import domExplorer from './dom-explorer';
console.log('a');
const ANIMATION_DURATION = 200;

const qs = document.querySelector.bind(document);
const firstChild = el => el.children ? el.children[0] : null;

// const flipNumber = number => {
//   const frontTop = qs('.flip-number .front-top');
//   const frontBottom = qs('.flip-number .front-bottom');
//   const backTop = qs('.flip-number .back-top');
//   const backBottom = qs('.flip-number .back-bottom');

//   firstChild(firstChild(backTop)).innerText = number;
//   firstChild(firstChild(backBottom)).innerText = number;

//   const frontPromise = frontTop.animate([
//     { transform: 'perspective(500px) rotateX(0deg)' },
//     { transform: 'perspective(500px) rotateX(180deg)' },
//   ], {
//     duration: ANIMATION_DURATION,
//   });
//   const backPromise = backBottom.animate([
//     { transform: 'perspective(500px) rotateX(180deg)' },
//     { transform: 'perspective(500px) rotateX(0deg)' },
//   ], { 
//     duration: ANIMATION_DURATION,
//   });

//   backPromise.onfinish = () => {
//     firstChild(firstChild(frontTop)).innerText = number;
//     firstChild(firstChild(frontBottom)).innerText = number;
//   };
// };

// const button = qs('button');
// flipNumber(5);

//----------------------

function FlipNumber(parentEl = document.body) {
  var template = '\
    <div class="front-top" data-target>\
      <div class="top">\
        <div class="number">1</div>\
      </div>\
    </div>\
    <div class="front-bottom" data-target>\
      <div class="bottom">\
        <div class="number">1</div>\
      </div>\
    </div>\
    <div class="back-top" data-target>\
      <div class="top">\
        <div class="number">2</div>\
      </div>\
    </div>\
    <div class="back-bottom" data-target>\
      <div class="bottom">\
        <div class="number">2</div>\
      </div>\
    </div>\
  ';

  this.root = createElement('div', {
    attrs: {
      class: 'flip-number',
    }
  });
  this.root.innerHTML = template;
  console.log(this);
  this.pieces = {};
  domExplorer(this.root, el => {
    if (el.hasAttribute('data-target')) {
      const name = el.getAttribute('class');
      this.pieces[name] = el;
    }
  });
  console.log(this.pieces);

  
  parentEl.appendChild(this.root);
}

FlipNumber.prototype.set = function (v) {

  firstChild(firstChild(this.pieces['back-top'])).innerText = v;
  firstChild(firstChild(this.pieces['back-bottom'])).innerText = v;

  this._animate()
    .then(() => {
      firstChild(firstChild(this.pieces['front-top'])).innerText = v;
      firstChild(firstChild(this.pieces['front-bottom'])).innerText = v;
    });
};

FlipNumber.prototype._animate = function () {
  return new Promise(resolve => {
    const frontAnimation = this.pieces['front-top'].animate([
      { transform: 'perspective(500px) rotateX(0deg)' },
      { transform: 'perspective(500px) rotateX(180deg)' },
    ], {
      duration: ANIMATION_DURATION,
    });
    const backAnimation = this.pieces['back-bottom'].animate([
      { transform: 'perspective(500px) rotateX(180deg)' },
      { transform: 'perspective(500px) rotateX(0deg)' },
    ], { 
      duration: ANIMATION_DURATION,
    });
    //파기되는 것이라서 on 으로 이벤트 연결
    backAnimation.onfinish = resolve;
  });
};

const fns = [
  new FlipNumber(),
  new FlipNumber(),
  new FlipNumber(),
  new FlipNumber(),
  new FlipNumber(),
  new FlipNumber(),  
];

setInterval(() => {
  const d = new Date;
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const t2s = str => String(str).length === 1 ? '0' + str : String(str);
  const timeArray = [...[h % 12, m, s].map(i => t2s(i)).join('')];
  fns.forEach(flipNumber => flipNumber.set(timeArray.shift()));
}, 1000);
