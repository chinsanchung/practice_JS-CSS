class Keyboard {
  constructor(text) {
    this.vk_layouts = [
      '`1234567890-={Backspace:backspace}{|}{Tab:tab}qwertyuiop[]\\{|}asdfghjkl\;\'{Enter:enter}{|}{Shift:goto,1}zxcvbnm,./{Shift:goto,1}{|}{Space:space}',
      '~!@#$%^&*()_+{Backspace:backspace}{|}{Tab:tab}QWERTYUIOP{}|{|}ASDFGHJKL:"{Enter:enter}{|}{Shift:goto,0}ZXCVBNM<>?{Shift:goto,0}{|}{Space:space}'
    ];
    this.smallSet = this.vk_layouts[0].split('{|}').map(str => this.keyParse(str) );
    this.capitalSet = this.vk_layouts[1].split('{|}').map(str => this.keyParse(str) );
    this.appendKeys(this.smallSet, 'small-sets');
    this.appendKeys(this.capitalSet, 'capital-sets');
    this.text = text;
    document.querySelector('#virtual-keyboard').addEventListener('click', e => this.inputKey(e));
  }
  keyParse(str) {
    const key_set = [];
    let cursor = 0;
    while (str.length > cursor) {
      const char = str[cursor];
      if (char !== '{') {
        key_set.push({ key: char, type: 'char', value: char });
      } else {
        if (str[cursor + 1] === '}') {
          key_set.push({ key: char, type: 'char', value: char });
        } else {
          const end_cursor = str.indexOf('}', cursor + 1);
          const raw_data = str.substring(cursor + 1, end_cursor);
          const [key, value] = raw_data.trim().split(':');
          key_set.push({ key, type: 'fn', value });
          cursor = end_cursor;
        }
      }
      cursor++;
    }
    return key_set;
  }
  createEl(tagName, attrs, content) {
    const el = document.createElement(tagName);
    for (const key in attrs) el.setAttribute(key, attrs[key]);
    el.textContent = content;
    return el;
  }
  appendKeys(array, el) {
    // 1210. 요소 안에 키들을 삽입
    array.forEach(sets => {
      const keys = this.createEl('div', { class: 'key-set' });
      sets.forEach(set => {
        if (set.type === 'char') {
          const key = this.createEl('button', { class: 'key', 'data-type': set.type, 'data-value': set.value }, set.key);
          keys.appendChild(key);
        } else if (set.value.indexOf('goto,') === -1) {
          const key = this.createEl('button', { class: `key ${set.value}`, 'data-type': set.type, 'data-value': set.value }, set.key);
          keys.appendChild(key);
        } else {
          const key = this.createEl('button', { class: `key goto`, 'data-type': set.type, 'data-value': set.value }, set.key);
          keys.appendChild(key);
        }
      });
      document.querySelector(`#${el}`).appendChild(keys);
    });
  }
  getCursor() {
    if (!this.text) return 0;
    return this.text.selectionStart;
  }
  setCursor(index) {
    if (!this.text) return;
    this.text.selectionStart = this.text.selectionEnd = index;
  }
  typing(value) {
    // TODO: 1210. scrollLeft로 입력할 위치를 옮김. 이벤트를 막아서 focus() 안되도록
    // `preventDefault`,`focus`, `blur`,`onfocus`, `onblur`
    const { text } = this;
    const current_cursor = this.getCursor();
    const before_text = text.value.slice(0, current_cursor);
    const after_text = text.value.slice(current_cursor);
    text.value = `${before_text}${value}${after_text}`;
    text.focus();
    if (current_cursor + value.length < 35) {
      this.setCursor(current_cursor + value.length);
    } else {
      text.scrollLeft = current_cursor + value.length + 1;
    }
  }
  inputKey(e) {
    const { text } = this;
    const val = e.path[0].dataset.value;
    // 1210. 키 말고 다른 걸 눌러 undefined 되는걸 막음
    if (val) {
      switch (val) {
        case 'goto,0':
          // 1210. 소문자화
          document.querySelector('#small-sets').style.display = 'block';
          document.querySelector('#capital-sets').style.display = 'none';
          break;
        case 'goto,1':
          // 1210. 대문자화
          document.querySelector('#capital-sets').style.display = 'block';
          document.querySelector('#small-sets').style.display = 'none';
          break;
        case 'backspace':
          const current_cursor = this.getCursor();
          if (current_cursor) {
            const before_text = text.value.slice(0, current_cursor - 1);
            const after_text = text.value.slice(current_cursor);
            text.value = `${before_text}${after_text}`;
            text.focus();
            this.setCursor(current_cursor - 1);
          } else {
            text.focus();
            this.setCursor(current_cursor);
          }
          break;
        case 'tab':
          this.typing('  ');
          break;
        case 'enter':
          alert(text.value);
          break;
        case 'space':
          this.typing(' ');
          break;
        default:
          e.preventDefault();  
          this.typing(val);
          
      }
    }
  }
}
