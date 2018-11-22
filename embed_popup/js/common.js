// 필요한 함수들을 export 로 따로 빼서 다른 js 파일에서 import 로 재사용할 수 있다.

/**
 * createElement: 위의 배열을 사용하는 것을 객체로 바꿈
 * @param { string } tagName 
 * @param { object } attrs
 * * @param { string } contents
 * @param { HTMLElement[] } children
 * @example
 * createElement('div', { class: 'test-class' })
 */
export const createElement = (tagName, attrs, content, children = []) => {
  const el = document.createElement(tagName);
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  for (const item of children) el.appendChild(item);
  el.textContent = content;
  return el;
};

/* 비동기로 이미지 제대로 불러왔는지 확인. 업로드 후 지운 이미지들이 빈 화면으로 남아있어서 이걸로 처리해야 함*/
export const getImage = (url, callback) => {
  const img = new Image;
  // 로드나 에러 났을 때 콜백..콜백은 return 이 의미없음
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = url;
}
// class 이름이 아닌 속성으로 찾아야 할 수도 있으므로 속성이름, 값으로 검색
export const findEl = (eventPath, attrName, attrValue) => {
  for (const item of eventPath) {
    if (item.getAttribute(attrName) === attrValue) return item;
  }
}
