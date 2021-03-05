import { localStorageKey, createItem, toDoList } from "./main.js";

//localStorage에 넣을 형식
function localSetting(text, id) {
  const toDoListObj = {
    text,
    id,
  };
  toDoList.push(toDoListObj);
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

export { localSetting, saveList, loadList };
