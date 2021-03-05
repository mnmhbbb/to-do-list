import { getDate, getTime } from "./DateTime.js";
import { localSetting, saveList, loadList } from "./LocalStorage.js";

const remain = document.querySelector(".header__remain");
const addBtn = document.querySelector(".footer__btn");
const input = document.querySelector(".footer__input");
const list = document.querySelector(".list");

input.focus();
let id = 0;

export const localStorageKey = "toDoList";
export let toDoList = [];

//리스트에 아이템 추가
function onAdd() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  createItem(text);
  saveList();
  remainList();
  input.value = "";
  input.focus();
}

//새 아이템 만들고 화면에 보이게.
export function createItem(text) {
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
  list.appendChild(itemRow);
  itemRow.scrollIntoView({ block: "center" });
  localSetting(text, id);
  id++;
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

// 체크 아이콘 이벤트리스너
list.addEventListener("click", (e) => {
  const target = e.target;
  const checkLi = target.parentNode.parentNode;
  if (target.classList.contains("far")) {
    target.className = "far fa-check-circle item__btn";
    target.parentNode.classList.add("clicked");
    const datasetId = parseInt(checkLi.dataset.id);
    const filterList = toDoList.filter((v) => {
      return v.id !== datasetId;
    });
    toDoList = filterList;
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
    const datasetId = parseInt(delLi.dataset.id);
    const filterList = toDoList.filter((v) => {
      return v.id !== datasetId;
    });
    toDoList = filterList;

    saveList();
    remainList();
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

function init() {
  loadList();
  remainList();
  getTime();
  setInterval(getTime, 1000);
  getDate();
}

init();
