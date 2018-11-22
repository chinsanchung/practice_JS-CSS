import timeSince from './timeSince';

const main = document.querySelector('.main');
const popup = document.querySelector('.popup');

const getData = (() => {
	const json_data = [];
	// running 은 동기 함수, getImage 는 비동기..running 후 getImage 라서 빈 배열이 뜸
	let currentCount = 0;
	const count = (maxLength) => {
		currentCount++;
		if (maxLength === currentCount) {
			// 이미지 정렬 해결-방법 1: 각 항목의 created_date 로 정렬
			json_data.sort((a, b) => {
				if (a.created_date > b.created_date) return -1;
				if (a.created_date < b.created_date) return 1;
			});
			running(json_data);
		};
	};
	// fixme: 현재 이미지를 비동기로 불러옴->항상 같은 이미지 순서로 나오질 않음(해결)
	fetch('https://api.hashsnap.net/posts/90659b50-d23d-414d-a755-0a4a9e69a35c?limit=500')
		.then(response => response.json())
		.then(data => {
			// 이미지 정렬 해결-방법 2
			// for (let i = 0, item; item = data.items[i]; i++)
			for (const item of data.items) {
				getImage(item.url, result => {
					// 체크가 끝나면 밑의 if 실행
					if (result) {
						json_data.push(item);
					}
					count(data.items.length);
				});
			}
		});
	// .then(() => running(json_data))
})();
// 불러온 데이터를 배열에 넣을 때 로딩중 판별, 로딩이 안된 데이터는 넣지 않도록 getImg 를 넣음

// for (const item of array1) {

// }
// for (let i = 0; i < array1.length; i++) {

// }
// for (let i = 0; 0; i++) console.log(i)
// [2,5,7,9]
// for (let i = 0, item; item = array1[i]; i++) {
//   i = 0 array1[0] = 2
//   i = 1 array1[1] = 5
//   7 9 undefined(거짓으로 여겨져서 for문 끝)
// }
// // for (const key in object1)

// JSDOC
/**
 * 1createElement: 배열로 출력. 모르고 같은 속성을 적을 위험이 있음
 * @param { string[] } attrNames 
 * @param { string[] } attrVales
 * @example
 * 1createElement('div', ['class', 'style'], ['test-class', 'display: none;'])
 */
// const createElement = (tagName, attrNames, attrValues) => {
//   const el = document.createElement(tagName);
//   // name 값이 1인지 2인지 확인 1이면 set 하나
//   // 2라면 set 두개
//   for (let i = 0; i < attrNames.length; i++) {
//     el.setAttribute(attrNames[i], attrValues[i]);
//   }
//   return el;
// }
0
/*
// 주로 현업에서 쓰는 방식
createElement('div', {
  attrs: {
    class: 'test'
  },
  inner: 'test',
}, [])
*/

/**
 * createElement: 위의 배열을 사용하는 것을 객체로 바꿈
 * @param { string } tagName 
 * @param { object } attrs
 * @param { HTMLElement[] } children
 * @example
 * createElement('div', { class: 'test-class' })
 */
const createElement = (tagName, attrs, children = []) => {
	const el = document.createElement(tagName);
	for (const key in attrs) el.setAttribute(key, attrs[key]);
	for (const item of children) el.appendChild(item);
	return el;
};

/* 비동기로 이미지 제대로 불러왔는지 확인. 업로드 후 지운 이미지들이 빈 화면으로 남아있어서 이걸로 처리해야 함*/
const getImage = (url, callback) => {
	const img = new Image;
	// 로드나 에러 났을 때 콜백..콜백은 return 이 의미없음
	img.onload = () => callback(true);
	img.onerror = () => callback(false);
	img.src = url;

}

// 이미지 리스트 출력
const createLists = (index, url, username, caption, date) => {
	const first = createElement('div', {
		class: 'post-root',
		'data-index': index,
		'data-url': url,
		'data-username': username,
		'data-caption': caption,
		'data-created_date': date
	});
	// innerhtml 안쓰는게 좋음 느려서 애니메이션할 때 렌더링하는동안 끊김. appendChild 가 더 빠름
	first.innerHTML = `<div class="post-head"><div class="post-context">
            <div class="image" style="background:url(${url}) no-repeat center;"></div>
            <div class="user">${username}</div>
        </div></div>`;
	main.appendChild(first);

	// fixme: 이벤트 위임을 사용해서 main 에만 단 한번 이벤트를 연결해서 다 쓰게 하기
	/*     first.addEventListener('click', e => {
				outputPop(index, url, username, caption);
	      document.querySelector(`.${username}`).style.display = 'block';
			}); */
	// return ()
}

// fixme: 팝업을 일일이 만들었다 삭제하지 말고 하나만 만든 후 innerHTML 로 내용을 바꾸게 하기 
const outputPopup = (index, url, username, caption) => {
	const popup = createElement('div', {
		class: `popup ${username}`,
		'data-index': index,
		style: 'display:none;'
	});
	popup.innerHTML = `<div class="pop_content">
			<div class="pop_img" style="background:url(${url}) no-repeat center;"></div>
			<div class="pop_side">${username}&nbsp;${caption}</div>
	</div>`
	document.body.appendChild(popup);
	/*
	popup.addEventListener('click', e => {
			if (e.target === popup) {
				popup.style.display = "none";
				// 해당 팝업 요소를 삭제..만들었다 지우는 방식은 지울 때마다 이벤트리스너 다시 실행..
				// popup.remove();
			}
	})
	*/
}



const running = (json_data) => {
	for (let index = 0, item; item = json_data[index]; index++) {
		const {
			url,
			username,
			caption,
			created_date
		} = item;
		createLists(index, url, username, caption, created_date);
		// fixme: 팝업 전부가 띄워지는 상황. 하나만 띄워져도 된다. 클릭하면 나오는 걸로 바꿔야함. 해결
		// outputPop(url, username, caption);
	}
	// 이벤트 위임을 사용해서 main 에 팝업 띄우고 지우는 이벤트 작성
	main.addEventListener('click', e => {
		for (const item of e.path) {
			if (item.className === 'post-root') {
				const {
					index,
					url,
					username,
					caption,
					created_date
				} = item.dataset;
				openPopupHandler(url, username, caption, created_date);
				break;
			}
		}
	});
}
// innerHTML 로 작성하는 요소들을 따로 빼서 render 함수로 만듦.
const render = (el, url, username, caption, date) => el.innerHTML = `<div class="pop_content">
						<div class="pop_img" style="background:url(${url}) no-repeat center;"></div>
						<div class="pop_side">
							<div class="pop_icon"></div>
							<div class="pop_name">${username}</div>
							<div class="pop_caption">
								<div>${caption}</div>
							</div>
							<time class="pop_date" datetime="date">${timeSince(date, 'ko')}</time>
						</div>
					</div>`;

const openPopupHandler = (url, username, caption, date) => {
	const popup = document.querySelector('.popup');
	render(popup, url, username, caption, date);
	popup.style.display = "block";
}
const closePopupHandler = () => {
	document.querySelector('.popup').style.display = "none";
}

// 팝업에 딛는 이벤트 연결
popup.addEventListener('click', e => {
	closePopupHandler();
});
// 초기 팝업 설정. 보이면 안됨.
popup.style.display = 'none';