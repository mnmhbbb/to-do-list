//기본
const header = document.querySelector(".header");
const remain = document.querySelector(".header__remain");
const addBtn = document.querySelector(".footer__btn");
const input = document.querySelector(".footer__input");
const list = document.querySelector(".list");
const itemCheck = document.querySelector("item__check");
input.focus();
let id = 0;

const localStorageKey = "toDoList";
let toDoList = [];

//리스트에 아이템 추가
function onAdd() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  createItem(text);
  saveList();
  input.value = "";
  input.focus();
  remainList();
}

//새 아이템 만들고 화면에 보이게.
function createItem(text) {
  //목록 추가
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
    <div class="item__left">
      <i class="far fa-circle item__btn"></i>
      <span class="item__text">${text}</span>
    </div>
    <i class="fas fa-times deleteBtn" data-id="${id}"></i>
    `;
  id++;
  list.appendChild(itemRow);
  itemRow.scrollIntoView({ block: "center" });

  //localStorage에 넣을 형식
  const toDoListObj = {
    text,
    id,
  };
  toDoList.push(toDoListObj);

  return itemRow;
}

//남은 할 일 알려주기
function remainList() {
  const remainlength = toDoList.length;
  if (remainlength === 0) {
    remain.classList.add("invisible");
  }
  if (remainlength) {
    remain.classList.remove("invisible");
    remain.innerHTML = `
    할 일 ${remainlength}개 남음
    `;
  }
}

//완료한 리스트
let checkList = [];

//체크목록들
function checkItem(text) {
  const itemCheck = document.createElement("li");
  itemCheck.setAttribute("class", "item__row clicked");
  itemCheck.setAttribute("data-id", id);
  itemCheck.innerHTML = `
    <div class="item__left">
      <i class="far fa-check-circle item__btn"></i>
      <span class="item__text">${text}</span>
    </div>
    <i class="fas fa-times deleteBtn" data-id="${id}"></i>
    `;

  id++;
  list.appendChild(itemCheck);
  itemCheck.scrollIntoView({ block: "center" });

  return checkItem;
}

// 체크 아이콘 이벤트리스너
// 체크한 아이템은 체크리스트로 이동 & 하단으로 이동
// 하단으로 이동x
list.addEventListener("click", (e) => {
  const target = e.target;
  const checkLi = target.parentNode.parentNode;
  if (target.classList.contains("far")) {
    target.className = "far fa-check-circle item__btn";
    target.parentNode.classList.add("clicked");
    for (let i = 0; i < toDoList.length; i++) {
      datasetId = parseInt(checkLi.dataset.id) + 1;
      if (toDoList[i].id == datasetId) {
        // list.removeChild(checkLi);
        const del = i;
        checkList.unshift(toDoList[del]);
        toDoList.splice(del, 1);
        // checkItem(checkList[0].text);
      }
    }
    saveList();
    remainList();
  }
});

// 삭제버튼 이벤트리스너
function removeList(e) {
  const target = e.target;
  if (target.classList.contains("fas")) {
    const delLi = target.parentNode;
    list.removeChild(delLi);

    //설정할 때 id=0으로 설정했는데 localStorage에선 1부터 설정되네
    //그래서 동일하게 비교하려고 +1
    datasetId = parseInt(delLi.dataset.id) + 1;
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].id == datasetId) {
        const del = i;
        toDoList.splice(del, 1);
      }
    }
    saveList();
    remainList();
  }
}

//localStorage에 저장
function saveList() {
  localStorage.setItem(localStorageKey, JSON.stringify(toDoList));
}
//localStorage에 저장된 값 가져오기
function loadList() {
  const loadList = localStorage.getItem(localStorageKey);
  if (loadList !== null) {
    const parseList = JSON.parse(loadList);
    parseList.forEach((item) => {
      createItem(item.text);
    });
  }
}

//main 입력에 대한...
addBtn.addEventListener("click", () => {
  onAdd();
  addBtn.classList.add("invisible");
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
    addBtn.classList.add("invisible");
  }
});
list.addEventListener("click", removeList);

//키보드 입력 시 클릭 버튼 활성화
input.addEventListener("keydown", (e) => {
  if (e) {
    addBtn.classList.remove("invisible");
  }
  if (input.value == "") {
    addBtn.classList.add("invisible");
  }
});

//현재시간
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const Colck = document.querySelector(".header__time");
  Colck.innerHTML = ` ${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;
}
//오늘 날짜
function getDate() {
  const date = new Date();
  const years = date.getFullYear();
  const months = date.getMonth();
  const dates = date.getDate();
  const day = date.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = days[day];
  const dateTitle = document.querySelector(".header__date");
  dateTitle.innerHTML = `
        ${years}년 ${months + 1}월 ${dates}일 ${today}요일`;
}

//아무 동작을 하지 않아도 기본적으로 실행될
function init() {
  loadList();
  remainList();
  getTime();
  setInterval(getTime, 1000);
  getDate();
}

init();
