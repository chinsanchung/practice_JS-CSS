# practice_JS-CSS
Practice JavaScript, CSS and HTML during trainee
## directory
### crawler_test_vue
- 인스타그램 HTML 요소들을 정규표현식으로 처리해 이미지만 띄우는 작업 진행.
### simple_popup
- API 로부터 데이터를 읽어온 후 정렬 후 팝업 이벤트 연결.
- 이벤트 위임으로 상위에 팝업 설정, 그리고 팝업에 닫는 이벤트 연결.
### print_page
- HTML5 의 `input type="file"` 그리고 `FileReader`의 `readAsDataURL`로 이미지를 가져옴.
- `boxShadow = "-100px -100px 0px 50px gray inset, " + "100px 100px 0px 50px gray inset"` 으로 프린트 화면 출력.
### embed_popup
- simple_popup 을 iframe 안에 넣어 상위 페이지 > 하위 페이지로 만듦.
- 팝업을 iframe 안에서 작동하도록 만들지 않고, 상위 페이지에서 작동하도록 만듦.
  - `window.parent.postMessage`로 부모 js 파일에 데이터를 전송, 부모 js 파일은 `window.addEventListener('message', 함수)`로 이어받아서 팝업 창 생성.
### console_output
1. [json_out.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/json_out.js) : JSON 의 원시값, 배열, 객체를 콘솔에 출력하는 함수.
2. [element_out.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/element_out.js) : 루트 요소를 입력하면 자기 자신과 모든 자식 요소들을 콘솔로 출력하는 함수.
3. [stringify.js](https://github.com/chinsanchung/practice_JS-CSS/blob/master/console_output/stringify.js) : JSON.stringify 를 구현해 객체들이 같은지 아닌지 확인하는 함수.
