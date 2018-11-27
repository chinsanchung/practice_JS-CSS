# practice_JS-CSS
Practice JavaScript, CSS and HTML during trainee

## directory
### crawler_test_vue
- 인스타그램의 HTML 요소들을 정규표현식으로 처리해 이미지만 추출한 후 페이지에 꾸미는 작업 진행.
### animation_move_rec
setTimeout 을 사용해 도형의 x, y 축을 이동시키는 간단한 애니메이션 구현.
[참고: JS animations](https://javascript.info/js-animation)
### simple_popup
- API 로부터 데이터를 읽고, 정렬 후 팝업 이벤트 연결.
- 이벤트 위임으로 상위에 팝업 설정, 그리고 팝업에 닫는 이벤트 연결.
### print_page
- HTML5 의 `input type="file"` 그리고 `FileReader`의 `readAsDataURL`로 이미지를 가져옴.
- `boxShadow = "-100px -100px 0px 50px gray inset, " + "100px 100px 0px 50px gray inset"` 으로 프린트 화면 출력.
- 뒤로가기 버튼으로 원래 이미지 화면으로 돌아감.
### embed_popup
- simple_popup 을 iframe 안에 넣어 상위 페이지 > 하위 페이지로 만듦.
- 팝업을 iframe 안에서 작동하도록 만들지 않고, 상위 페이지에서 작동하도록 만듦.
  - `window.parent.postMessage`로 부모 js 파일에 데이터를 전송, 부모 js 파일은 `window.addEventListener('message', 함수)`로 이어받아서 팝업 창 생성.
- 크기에 상관없이 위치를 고정시키는 방법 예시: `transform: translateY(-50%);position: absolute;top: 0;right: 25px;`
- 대상의 크기와 상관없이 가운데 정렬하는 법. 네 개가 세트로 작동.
```CSS
{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```
- 팝업 창을 지우는 두 방법들
  1. 미리 팝업 div 를 만들어두고 innerHTML 로 클릭 때마다 바꾸기, 닫을 때는 display:none 으로 보이지 않게 처리.
  2. 팝업을 닫을 때 가상 DOM 에 저장해서 HTML 페이지에 div 가 사라지도록 처리. 띄울 때는 innerHTML 로 바꾸고 가상 DOM 에서 다시 가져옴.
### console_output
1. [json_out.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/json_out.js) : JSON 의 원시값, 배열, 객체를 콘솔에 출력하는 함수.
2. [element_out.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/element_out.js) : 루트 요소를 입력하면 자기 자신과 모든 자식 요소들을 콘솔로 출력하는 함수.
3. [stringify.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/stringify.js) : JSON.stringify 를 구현해 객체들이 같은지 아닌지 확인하는 함수.
### flipclock_with_velocity
velocity.js 라이브러리를 사용해 FlipClock.js 처럼 움직이는 시계 만들기.
- 해설본 참조할 것
### 3d_rectangle
- transform, transform-origin, transform-property 을 사용해 3차원 정사각형을 만들기.
  - translateZ 값을 고정시키고 rotateX, rotateY 만 조절해서 3차원 정사각형 완성(translateZ 를 변수화할 수도 있음).
- rotate3d animation 으로 회전시키는 작업.
- 애니메이션 빼고 Z 축 이동을 통해 도형의 너비, 높이를 2차원 도형과 같게 만들기.
[출처: stackoverflow](https://stackoverflow.com/questions/16771225/css3-rotate-animation)
[출처: Intro to CSS 3d transition](https://3dtransforms.desandro.com/box)
### animation_library
[JavaScript animations](https://javascript.info/js-animation)을 참고해 velocity 같은 애니메이션 라이브러리 만듦.
애니메이션을 제어할 수 있는 객체를 반환.