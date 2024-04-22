import movieList from "./movieList.js";

// 간지나는 콘솔 출력
console.log('\n\n%c🆂🆂🅰🅵🅻🅸🆇\n\n\n%c[Vanila.JS] %cFront-end Project\n\n%c © SSAFY 서울_7반_황민욱',
    'font-size:32px; font-weight:bold;', 'font-size:14px; font-weight:bold;', 'font-size:14px;', 'font-size:12px; color: #555555;');

const movies = document.getElementById("movies");
const likes = document.getElementById("likes");
const mainTitle = document.getElementById("main-title");
const logo = document.querySelector(".logo");

let list = movieList;
let movieCards;
let marginLeft;
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
    const clickedMovie = movieList[clickedKey];
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
    const clickedMovie = movieList[clickedKey];
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

    let inputValue = document.querySelector(".search-input").value;

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

// 영화 목록 렌더
const renderMovieList = (movieList) => {
    isError = false;
    const innerHTML = movieList
        .map((item, index) => {
            let isMovieChecked = item.isChecked ? "disabled" : "";
            return `<li class="movie-card">
        <img src="./img/${item.img}" alt="${item.title}" />
        <div class="details">
            <div class="text">
                <div class="title">${item.title}</div>
                <div class="info">
                    <div class="genre">${item.genre}</div>
                    <div class="director">${item.director}</div>
                    <div class="running-time">${item.runningTime}분</div>
                </div>
            </div>
            <button type="button" class="movie-like-button" data-key="${item.id}" ${isMovieChecked}>
                <span class="text"> 찜 </span>
                <span class="material-symbols-outlined">
                    favorite
                </span>
            </button>
        </div>
    </li>`;
        })
        .join("");

    movies.innerHTML = innerHTML;

    const buttons = document.querySelectorAll(".movie-like-button");
    buttons.forEach((button) => {
        button.addEventListener("click", addMyList);
    });

    // 카드에 헤더 맞추기
    movieCards = document.querySelectorAll(".movie-card");
    marginLeft = movieCards[0].offsetLeft;
    mainTitle.style.marginLeft = marginLeft + "px";
};

// 찜 리스트 렌더
const renderMyList = (myList) => {
    const innerHTML = myList
        .map((item) => {
            return `<div class="my-movie-container">
            <img
                class="my-movie-img"
                src="./img/${item.img}"
                alt="${item.title}"
            />
            <div class="details">
                <div class="text">
                    <div class="title">${item.title}</div>
                    <div class="info">
                        <div class="genre">
                            장르 <strong>${item.genre}</strong>
                        </div>
                        <div class="director">
                            감독 <strong>${item.director}</strong>
                        </div>
                        <div class="running-time">
                            러닝타임 <strong>${item.runningTime}분</strong>
                        </div>
                    </div>
                </div>

                <button type="button" class="movie-unlike-button" data-key="${item.id}">
                    <span class="text"> 삭제 </span>
                </button>
            </div>
        </div>`;
        })
        .join("");

    likes.innerHTML = innerHTML;

    const buttons = document.querySelectorAll(".movie-unlike-button");
    buttons.forEach((button) => {
        button.addEventListener("click", deleteMyList);
    });
};

// 에러 렌더
const renderError = (error) => {
    const innerHTML = `<div class="error-container">
    <span
        class="material-symbols-outlined"
        style="font-size: 64px; font-weight: 600"
    >
        report</span
    >
    <p><span>${error}</span></p>
</div>`;
    movies.innerHTML = innerHTML;
};

renderMovieList(list);
if (localStorage.getItem('myList') === null) {
    localStorage.setItem('myList', JSON.stringify([]));
} else {
    const myList = JSON.parse(localStorage.getItem('myList')); // 로컬 스토리지에서 가져오기.
    renderMyList(myList);
}

/*

[추후 리팩토링 테스크]
- attribute에 id를 넣는게 최선의 방법일지?
- innerHTML에 모든 리스트를 넣어서 처리하는 것이 아니라 하나씩 처리를 해보기.

*/