import timeSince from '../timeSince';

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
		}
		// 이벤트 위임을 사용해서 main 에 팝업 띄우고 지우는 이벤트 작성
		main.addEventListener('click', e => {
			for (const item of e.path) {
				if (item.className === 'post-root') {
					const { index, url, username, caption, created_date } = item.dataset;
					openPopupHandler(url, username, caption, created_date);
					break;
				}
			}
		});
}

//이미지를 누르면 부모 embed.html 에 메시지 전달
const openPopupHandler = (url, username, caption, date) => {
	window.parent.postMessage(makeMessage(url, username, caption, date), '*');
}

//postMessage 에 보낼 원시값(문자열)
const makeMessage = (url, username, caption, date) => {
	const popupHtml = `<div class="pop_content">
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
	
	return popupHtml;
}