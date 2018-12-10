const inputCSS = (value) => {
  const styles = document.querySelector('#s');
  const sheet = styles.sheet;
  const rules = sheet.cssRules;
  
  sheet.insertRule(value, rules.length);
}

// 디자인을 임의로 설정 가능
const keyboardCSS = `#virtual-keyboard {
  text-align: center;
  position: relative;
  width: 800px;
  height: 320px;
  background-color: #DEDEDE;
  box-shadow: inset 0 0 8px #bbb, 0 1px 0 #aaa, 0 4px 0 #bbb, 0 10px 30px #ddd;
}`
const spaceCSS = `.space {
  width: 500px;
}`
const keyCSS = `.key {
  font-size: 20px;
  background-color: #d571f4;
  margin: 3px;
  box-shadow: 1px 1px 0px 0px grey;
  padding: 14px;
  text-align: center;
  border-radius: 10px;
}`;
const keyHover = `.key:hover {
  background-color: #aeff70;
  box-shadow: 0 3px 5px 0 #b5b7ee, inset 0px -3px 1px 1px #b5b7ee;
}`
const fnKeyCSS = `.backspace, .goto, .enter, .space {
  background-color: #72d8fd;
}`

inputCSS(keyboardCSS);
inputCSS(spaceCSS);
inputCSS(keyCSS);
inputCSS(keyHover);
inputCSS(fnKeyCSS);