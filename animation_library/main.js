const rec = document.querySelector('.content').children[0];
// 1. 함수들
/*     const move = (el, st, end, styles) => {
      if (st.hasOwnProperty('y')) {
        // const loop = i => {
        //   console.log(i);
        //   el.style.left = i['x'] + 'px';
        //   el.style.top = i['y'] + 'px';
        //   if ((i['x'] < end['x']) && (i['y'] < end['y'])) setTimeout(loop, 60, {x: i['x'] + 2, y: i['y'] + 2});
        // }
        // loop(st);
        setStyle(el, styles);
        const start = Date.now();
        const moving = setInterval(() => {
          const next = Math.floor((Date.now() - start) / 100);
          el.style.cssText += `left:${st['x'] + next}px`;
          el.style.cssText += `top:${st['y'] + next}px`;
          if ((st['x'] + next === end['x']) && (st['y'] + next === end['y'])) {
            clearInterval(moving);
            return;
          }
        }, 60);
      } else {
        const loop = i => {
          console.log(i);
          el.style.left = i + 'px';
          if (i < end) setTimeout(loop, 60, i + 2);
        }
        loop(st);
      }
    }
    const setStyle = (el, styles) => {
      let text = '';
      for (const key in styles) {
        text += `${key}:${styles[key]};`;
      }
      el.style.cssText += text;
      console.log(text);
    }
     */
  // 콘솔
  // rec1 = new Moving(rec, {background:'red', width:'100px', height:'100px'});

// 2. 클래스
// TODO: 라이브러리...편하게 쓸 수 있을만큼..프로미스찍고, 체인 걸고 해야하는 상황..
    class Moving {
      constructor(el, styles) {
        this.el = el;
        this.styles = styles;
        this.animationEnd = false;
        this.setStyle(styles);
      }
      transparent(st, end) {
        let i = 0;
        (st > end ? i = -0.05 : i = 0.05)
        const loop = setInterval(() => {
          this.el.style.cssText += `opacity:${st + i}`;
          if (this.el.style.opacity === end) {
            clearInterval(loop);
            return;
          }
        })
      }
      
      move(st, end, speed, callback) {
        // 콜백이 아니라 프로미스로 해결하기..이걸로 하면 Moving 은 이제 프로미스를 가짐
        this.promise = new Promise(resolve => {
          this.resolve = resolve;
        });
        this.animationEnd = false;
        const el = this.el;
        let start = performance.now();
        
        const duration = 2000;
        // el.style.cssText += `left:${st['x']}px;top:${st['y']}px`;
        // 화살표 함수가 아닌 것은 this 가 막혀서 따로 지정해야함
        const that = this;

        requestAnimationFrame(function insideMove(time) {
          let timeFraction = (time - start) / duration;

          if (timeFraction > 1) {
            timeFraction = 1;
            // 다른 애니메이션 중첩 막기, 로딩 안됐는데도 실행하는것 막으려고 프로미스 아니면 콜백 실행
            /* move 로 이동이 끝나면 다시 움직이도록 설정하기...콜백상으로는 move({st}, {e}, () => move({st}, {e}, () => move...))
              이렇게 계속해서 콜백함수에 반복해서 실행해야함.
            */
            that.animationEnd = true;
            if (that.animationEnd) {
              if (typeof callback === 'function') callback();
              that.resolve();
            }
          }
          // timing
          let progress = timeFraction;
          
          // draw
          // el.style.cssText += `left:${progress * end['x']}px;top:${progress * end['y']}px`;
          el.style.cssText += `left:${st['x'] + (that.calculate(progress, speed) * end['x'])}px;
          top:${st['y'] + (that.calculate(progress, speed) * end['y'])}px`;
          if (timeFraction < 1) requestAnimationFrame(insideMove);
        });
        
        return this;
      }
      // 속도조절 추가
      calculate(progress, speed) {
/*         switch(this.speed) {
          case('arc'):
            return 1 - Math.sin(Math.acos(progress));
          case('curve'):
            return Math.pow(timeFraction, 5);
          default:
            return progress;
        } */
        return Math.pow(progress, speed);
      }
      setStyle(style) {
        let text = '';
        for (const key in style) {
          text += `${key}:${style[key]};`;
        }
        this.el.style.cssText += text;
      }
    }
    // 콘솔
    const rec1 = new Moving(rec, {background:'red', width:'100px', height:'100px'});
    // 현재 프로미스 생성..클릭하면 pending(대기) 상태: 비동기 처리 로직이 아직 완료되지 않음
    // 93줄의 that.resolve() 를 실행해서 프로미스는 resovle 상태가 됨
    // 여기서 한번 실행해서 resolve 상태로 만들어야 then 을 실행가능
    rec1.move({x: 0, y: 0}, {x: 100, y: 100}, 1);
    rec1.promise
      .then((resolve) => rec1.move({x: 100, y: 100}, {x: 200, y: 200}, 2).promise)
      .then((resolve) => rec1.move({x: 300, y: 300}, {x: 350, y: 350}, 5).promise);
    