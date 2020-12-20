//기본
const addBtn = document.querySelector(".footer__btn");
const input = document.querySelector(".footer__input");
const items = document.querySelector(".items");
input.focus();
let id = 0;

input.addEventListener("keydown", (e) => {
  if (e) {
    addBtn.classList.remove("invisible");
  }
});

//아이템 추가
function onAdd() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });
  input.value = "";
  input.focus();
}

//새 아이템 만들기
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "items__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
  <div class="item">
  <div class="item__left">
      <i class="far fa-circle item__btn"></i>
    <span class="item__text">${text}</span>
  </div>
  <button class="deleteBtn">
    <i class="fas fa-times" data-id="${id}"></i>
  </button>
</div>`;

  id++;
  return itemRow;
}

const clickedItem = document.querySelector(".item");
const itemBtn = document.querySelector(".item__btn");
//완료된 목록
items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const toBeDeleted = document.querySelector(`.items__row[data-id="${id}"]`);
  if (id) {
    toBeDeleted.remove();
    input.focus();
  }
  if (e.target.classList.contains("far")) {
    e.target.className = "far fa-check-circle item__btn";
    e.target.parentNode.classList.add("clicked");
    input.focus();
  }
});

//main
addBtn.addEventListener("click", onAdd);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

//현재시간
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const Colck = document.querySelector(".time");
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
  const dateTitle = document.querySelector(".date");
  dateTitle.innerHTML = `
    ${years}년 ${months + 1}월 ${dates}일 ${today}요일`;
}

getTime();
setInterval(getTime, 1000);
getDate();
