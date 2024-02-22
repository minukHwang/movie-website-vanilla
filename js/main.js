import movieList from "./movieList.js";

const movies = document.getElementById("movies");
const likes = document.getElementById("likes");
const mainTitle = document.getElementById("main-title");
const logo = document.querySelector(".logo");

let list = movieList;
let myList = [];
let movieCards;
let marginLeft;
let isError = false;

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
    let clickedButton = event.currentTarget;
    let clickedKey = clickedButton.getAttribute("data-key");
    let clickedMovie = movieList[clickedKey];
    clickedMovie.isChecked = true;

    let likedMovie = clickedMovie;
    myList.push(likedMovie);
    renderMyList();
    renderMovieList(list);
};

// 리스트에서 영화 찜 삭제
const deleteMyList = (event) => {
    let clickedButton = event.currentTarget;
    let clickedKey = clickedButton.getAttribute("data-key");
    let clickedMovie = movieList[clickedKey];
    clickedMovie.isChecked = false;

    for (let i = 0; i < myList.length; i++) {
        if (myList[i].id == clickedKey) {
            myList.splice(i, 1);
        }
    }

    renderMyList();
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
    }
};

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", searchClick);
searchForm.addEventListener("keydown", searchEnter);

// 영화 목록 렌더
const renderMovieList = (movieList) => {
    isError = false;
    let innerHTML = movieList
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
const renderMyList = () => {
    let innerHTML = myList
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
    let innerHTML = `<div class="error-container">
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
