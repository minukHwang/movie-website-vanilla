// 간지나는 콘솔 출력
console.log('\n\n%c🆂🆂🅰🅵🅻🅸🆇\n\n\n%c[Vanila.JS] %cProject 05. XMLHttpRequest\n\n%c © SSAFY 서울_7반_황민욱',
    'font-size:32px; font-weight:bold;', 'font-size:14px; font-weight:bold;', 'font-size:14px;', 'font-size:12px; color: #555555;');

const movies = document.getElementById("movies");
const likes = document.getElementById("likes");
const mainTitle = document.getElementById("main-title");
const logo = document.querySelector(".logo");

// 영화 객체 배열
let list;
let movieList;

// 창크기에 맞춰서 동적으로 화면 구성을 하기 위한 변수들
let movieCards; 
let marginLeft;

// 에러처리
let isError = false;

// 로고 클릭 후 메인 화면 표시
logo.addEventListener("click", () => {
    list = movieList;
    mainTitle.style.display = "";
    movies.style.height = "";
    renderMovieList(list);
});

// 창 크기가 바뀌면 카드에 헤더 맞추기
window.addEventListener("resize", () => {
    movieCards = document.querySelectorAll(".movie-card");
    marginLeft = movieCards[0].offsetLeft;
    mainTitle.style.marginLeft = marginLeft + "px";
});

// 리스트에 영화 찜 넣기
const addMyList = (event) => {
    const clickedButton = event.currentTarget;
    const clickedKey = clickedButton.getAttribute("data-key");
    const clickedMovie = list[clickedKey];
    clickedMovie.isChecked = true;

    const myList = JSON.parse(localStorage.getItem('myList')); // 로컬 스토리지에서 가져오기.

    myList.push(clickedMovie); // 선택한 영화 넣기

    localStorage.setItem('myList', JSON.stringify(myList)); // 로컬 스토리지에 객체 배열 넣기

    renderMyList(myList);
    renderMovieList(list);
};

// 리스트에서 영화 찜 삭제
const deleteMyList = (event) => {
    const clickedButton = event.currentTarget;
    const clickedKey = clickedButton.getAttribute("data-key");
    const clickedMovie = list[clickedKey];
    clickedMovie.isChecked = false;

    const myList = JSON.parse(localStorage.getItem('myList')); // 로컬 스토리지에서 가져오기.

    for (let i = 0; i < myList.length; i++) {
        if (myList[i].id == clickedKey) {
            myList.splice(i, 1);
        }
    }

    localStorage.setItem('myList', JSON.stringify(myList)); // 로컬 스토리지에 객체 배열 넣기

    renderMyList(myList);
    !isError && renderMovieList(list);
};

// 영화 검색
const searchClick = (event) => {
    list = [];
    event.preventDefault();

    const inputValue = document.querySelector(".search-input").value;

    // 검색 결과 없을 시 에러 핸들링
    try {
        for (let i = 0; i < movieList.length; i++) {
            if (
                movieList[i].title
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
            ) {
                list.push(movieList[i]);
            }
        }

        if (list.length === 0) {
            throw new Error("검색 결과가 없습니다.");
        }

        mainTitle.style.display = "none";
        movies.style.height = "calc(100vh - 138px - 65px)";

        renderMovieList(list);
    } catch (error) {
        mainTitle.style.display = "none";
        movies.style.height = "calc(100vh - 138px - 65px)";
        isError = true;

        renderError(error.message);
    }

    document.querySelector(".search-input").value = "";
};

const searchEnter = (event) => {
    list = [];

    if (event.key == "Enter") {
        event.preventDefault();

        const inputValue = document.querySelector(".search-input").value;

        // 검색 결과 없을 시 에러 핸들링
        try {
            for (let i = 0; i < movieList.length; i++) {
                if (
                    movieList[i].title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                ) {
                    list.push(movieList[i]);
                }
            }

            if (list.length === 0) {
                throw new Error("검색 결과가 없습니다.");
            }

            mainTitle.style.display = "none";
            movies.style.height = "calc(100vh - 138px - 65px)";

            renderMovieList(list);
        } catch (error) {
            mainTitle.style.display = "none";
            movies.style.height = "calc(100vh - 138px - 65px)";
            isError = true;

            renderError(error.message);
        }

        document.querySelector(".search-input").value = "";
    }
};

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchClick);
searchForm.addEventListener("keydown", searchEnter);

/*
** Render Functions
*/ 

// 영화 목록 렌더
const renderMovieList = (movieList) => {
    isError = false;
    
    const fragment = document.createDocumentFragment(); // DocumentFragment 생성

    movieList.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'movie-card';

        const img = document.createElement('img');
        img.src = `./${item.img}`;
        img.alt = item.title;

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details';

        const textDiv = document.createElement('div');
        textDiv.className = 'text';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = item.title;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const genreDiv = document.createElement('div');
        genreDiv.className = 'genre';
        genreDiv.textContent = item.genre;

        const directorDiv = document.createElement('div');
        directorDiv.className = 'director';
        directorDiv.textContent = item.director;

        const runningTimeDiv = document.createElement('div');
        runningTimeDiv.className = 'running-time';
        runningTimeDiv.textContent = `${item.runningTime}분`;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'movie-like-button';
        button.setAttribute('data-key', item.id);
        button.addEventListener('click', addMyList);
        if (item.isChecked) {
            button.disabled = true;
        }
        const spanText = document.createElement('span');
        spanText.className = 'text';
        spanText.textContent = '찜';

        const spanIcon = document.createElement('span');
        spanIcon.className = 'material-symbols-outlined';
        spanIcon.textContent = 'favorite';

        button.appendChild(spanText);
        button.appendChild(spanIcon);

        textDiv.appendChild(titleDiv);
        infoDiv.appendChild(genreDiv);
        infoDiv.appendChild(directorDiv);
        infoDiv.appendChild(runningTimeDiv);
        textDiv.appendChild(infoDiv);
        detailsDiv.appendChild(textDiv);
        detailsDiv.appendChild(button);

        li.appendChild(img);
        li.appendChild(detailsDiv);
        fragment.appendChild(li); // 각 li를 fragment에 추가
    });

    movies.innerHTML = ''; // 기존 내용을 비우고
    movies.appendChild(fragment); // fragment 전체를 한 번에 추가

    // 카드에 헤더 맞추기
    movieCards = document.querySelectorAll(".movie-card");
    marginLeft = movieCards[0].offsetLeft;
    mainTitle.style.marginLeft = marginLeft + "px";
};

// 찜 리스트 렌더
const renderMyList = (myList) => {
    const fragment = document.createDocumentFragment(); 

    myList.forEach((item) => {
        const container = document.createElement('div');
        container.className = 'my-movie-container';

        const img = document.createElement('img');
        img.className = 'my-movie-img';
        img.src = `./${item.img}`;
        img.alt = item.title;

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details';

        const textDiv = document.createElement('div');
        textDiv.className = 'text';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = item.title;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const genreDiv = document.createElement('div');
        genreDiv.className = 'genre';
        genreDiv.innerHTML = `장르 <strong>${item.genre}</strong>`;  

        const directorDiv = document.createElement('div');
        directorDiv.className = 'director';
        directorDiv.innerHTML = `감독 <strong>${item.director}</strong>`;  

        const runningTimeDiv = document.createElement('div');
        runningTimeDiv.className = 'running-time';
        runningTimeDiv.innerHTML = `러닝타임 <strong>${item.runningTime}분</strong>`;  
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'movie-unlike-button';
        button.setAttribute('data-key', item.id);
        button.textContent = '삭제'; 
        button.addEventListener('click', deleteMyList);

        textDiv.appendChild(titleDiv);
        infoDiv.appendChild(genreDiv);
        infoDiv.appendChild(directorDiv);
        infoDiv.appendChild(runningTimeDiv);
        textDiv.appendChild(infoDiv);
        detailsDiv.appendChild(textDiv);
        detailsDiv.appendChild(button);
        container.appendChild(img);
        container.appendChild(detailsDiv);
        fragment.appendChild(container);
    });

    likes.innerHTML = ''; 
    likes.appendChild(fragment); 
};

// 에러 렌더
const renderError = (error) => {
    // 에러 컨테이너 생성
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';

    // 아이콘 생성
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.style.fontSize = '64px';
    iconSpan.style.fontWeight = '600';
    iconSpan.textContent = 'report';

    // 에러 메시지를 담을 <p> 태그 생성
    const errorMessage = document.createElement('p');
    const errorText = document.createElement('span');
    errorText.textContent = error;  // XSS 방지를 위해 textContent 사용
    errorMessage.appendChild(errorText);

    // 컨테이너에 아이콘과 에러 메시지 추가
    errorContainer.appendChild(iconSpan);
    errorContainer.appendChild(errorMessage);

    // 기존의 movies 내용을 비우고 에러 메시지를 추가
    movies.innerHTML = '';  // 기존 내용을 비우기
    movies.appendChild(errorContainer);  // 새로운 에러 컨테이너 추가
};

// JSON 받아오기
const getJson = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.response);
                    resolve(data);
                } catch (e) {
                    reject(new Error('Invalid JSON response'));
                }
            } else {
                reject(new Error(`[HTTP Status] ${xhr.status}: ${xhr.statusText}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error("[XHR] Network Error"));
        };
    });
};

// 초기 영화 리스트 설정
const setMovieList = (movies) => {
    movies.forEach((item, index) => {
        item.isChecked = false; // 객체에 직접 isChecked 속성을 추가
        item.id = index;
    });

    list = movies;
    movieList = movies;
    
    if (localStorage.getItem('myList') === null) {
        localStorage.setItem('myList', JSON.stringify([]));
    } else {
        const myList = JSON.parse(localStorage.getItem('myList')); // 로컬 스토리지에서 가져오기.
    
        myList.forEach((movie)=>{
            list[movie.id].isChecked = true; // 현재는 id가 index라서 가능함.
        })
        
        renderMyList(myList);
    }   

    renderMovieList(list);
}

getJson('./data/movie.json')
    .then(response => setMovieList(response.movies))
    .catch(error => console.error(error));

/*
[추후 리팩토링 테스크]
- attribute에 id를 넣는게 최선의 방법일지?
- innerHTML에 모든 리스트를 넣어서 처리하는 것이 아니라 하나씩 처리를 해보기. (완료)
    - XSS 공격에 취약해서 이렇게 하는 것이 좋지 않을 수도 있다. 
    - 성능 체크 필요 (리렌더링 자주 발생)
    - insertAdjacentHTML 활용해보기
- 매번 리스트를 다시 렌더링 걸지 말고 하나씩 세밀화해서 넣을 수 없을까?
- 초기에 영화가 로컬 스토리지에서 찜 되어 있으면 어떻게 효율적으로 전체 무비 배열에서 선별해서 버튼을 비활성화 할 것인지 고민.
*/