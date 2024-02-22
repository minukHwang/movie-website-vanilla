import movieList from "./movieList.js";

/*
 ** 도전 과제
 */

// 마이 리스트 스타일 꾸며주기
// 찜 버튼 토글화?
// 인풋에 입력값 받으면 해당 영화만 보여주기
// 마이 리스트 삭제 구현
// 타이틀 -> 미디어 쿼리로 한것들 좀 자바스크립트로 정리
// 모바일 페이지 반응형 구현
// 찜 호버하면 채워진 하트 -> disabled 되어도 채워진 하트
// 리스트에 id 고유 id값 생성해서 넣어보고 삭제도 해보고~~ 심볼로 해보시길

const movies = document.getElementById("movies");
const likes = document.getElementById("likes");

let myList = [];

const addMyList = (event) => {
    let clickedButton = event.currentTarget;
    let clickedKey = event.currentTarget.getAttribute("data-key");
    let clickedMovie = movieList[clickedKey];

    let likedMovie = clickedMovie;
    myList.push(likedMovie);
    renderMyList();

    // 버튼 disabled 처리
    event.currentTarget.disabled = true;

    // if (!clickedButton.classList.contains("selected")) {
    //     let clickedKey = clickedButton.getAttribute("data-key");
    //     let clickedMovie = movieList[clickedKey];

    //     let likedMovie = clickedMovie;
    //     myList.push(likedMovie);
    //     renderMyList();
    // }

    // // 버튼 disabled 처리
    // clickedButton.classList.toggle("selected");
};

const renderMovieList = () => {
    let innerHTML = movieList
        .map((item, index) => {
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
            <button class="movie-like-button" data-key="${index}">
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
};

const renderMyList = () => {
    let innerHTML = myList
        .map((item) => {
            return `<div class="my-movie" style="padding-bottom: 10px"> ${item.title} | ${item.genre} | ${item.director} | ${item.runningTime} </div>`;
        })
        .join("");

    likes.innerHTML = innerHTML;
};

renderMovieList();
