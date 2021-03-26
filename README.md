# To Do List

#### 1. 이름 : 할 일 목록 관리 앱

#### 2. 사용한 기술 : HTML, CSS, JavaScript

#### 3. 기간 : 2020년 12월 21일 ~ 12월 22일
  - 2020.12.21: ver1 - 기본 기능
  - [2020.12.21~22: ver2 - 남은 할일 알려주기](#201222-ver2)
  - [2021.01.20: ver2.1.0](#20210120)
    - 완성된 페이지: https://mnmhbbb.github.io/to-do-list/

#### 4. 주요 기능

![이미지](https://user-images.githubusercontent.com/66292371/102768656-d9b37580-43c4-11eb-8e60-ad35f4b8ddb0.gif)

- 현재 시각 시, 분, 초까지 구현(지금도 시간이 흐르고 있음을 시각적으로,,,)
- 할 일 입력(버튼 클릭 & 키보드 엔터)
- 완료한 목록은 체크 아이콘으로 변경
- 삭제하고 싶은 목록은 아이콘 클릭하여 삭제
- 목록이 많을 시, 스크롤 내릴 수 있음
- 이때, 현재 추가한 목록으로 스크롤이 자동 포커싱 되게 하였음(`scrollIntoView({block: "center"})`)
- 추가 : 입력되고 있을 때만 클릭 버튼 활성
- 추가 : 완료 체크 아이콘 다시 체크해제 가능

#### 5. 느낀 점

아주 간단하고 기본적이지만, 최대한 혼자 고민하고 해결하려고 노력했다. 도무지 풀리지 않을 땐 검색을 통해서 힌트를 얻으려고 했다.  
하지만 아직 응용하는 능력이 부족다고 생각되어 더 많이 고민하고 경험해봐야 겠다.

#### 6. 추가하고 싶은 기능

- 완료한 목록은 하단으로 내려가게 해서 남은 리스트만 위에 보이게 하기(아이폰 메모어플처럼)
- 남은 할 일 갯수 안내 문구
- 새로고침 해도 목록이 사라지지 않게 하려면??? -> window API인 localStorage 활용하기

#### + 추가한 기능

- 입력 클릭 버튼 위치가 애매해서 인풋 옆으로 옮기고, `keydown` 이벤트를 사용해서 평소엔 안보이다가 키보드 입력이 되었을 때 클릭 버튼이 생기게 했음.

  ```javascript
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      onAdd();
      addBtn.classList.add("invisible");
    }
  });
  //키보드 입력 시 클릭 버튼 활성화
  input.addEventListener("keydown", (e) => {
    if (e) {
      addBtn.classList.remove("invisible");
    }
    if (input.value == "") {
      addBtn.classList.add("invisible");
    }
  });
  ```

  생각보다 간단했다.. 일단 엔터 키 눌러서 리스트 입력하면 다시 클릭 버튼 비활성화하고, input.value가 아무것도 없을 때도 비활성화되도록 했다. 또한 클릭 버튼 입력 시에도 비활성화를 해야 한다.

  - 완료 체크해제 부분

  ```javascript
  //완료된 목록
  items.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const target = e.target;
    const toBeDeleted = document.querySelector(`.items__row[data-id="${id}"]`);
    if (id) {
      toBeDeleted.remove();
    }
    if (target.classList.contains("far")) {
      target.className = "far fa-check-circle item__btn";
      target.parentNode.classList.toggle("clicked");
      if (!target.parentNode.classList.contains("clicked")) {
        target.className = "far fa-circle item__btn";
      }
    }
  });
  ```

#### 201222 ver2 
  ![이미지](https://user-images.githubusercontent.com/66292371/102909012-a0116600-44bb-11eb-8818-c4c1867b3fa4.gif)

#### 기능 및 특징  
  - `localStorage`를 사용하여 새로고침이나 페이지를 닫아도 데이터가 남아있음   
  - 이번엔 목록을 배열에 담아서 관리하고 `filter`, `push` 등과 같은 배열 메서드를 사용함      
  - 완료 체크한 아이콘은 따로 만든 배열에 담고, 체크한 해당 목록은 하단으로 내려가게, 남은 할 일이 상위에 남게 하였음(아이폰 메모어플 참조)     
  - 이를 통해 현재 남은 할 일의 개수를 안내하는 문구가 즉각적으로 반영되게 하였음      
  - 이전과 동일하게, 키보드 입력이 될 때만 입력 버튼 활성화시킴   

#### 구성
### 1.
- 페이지를 열었을 때 기본적으로 실행될 부분이다.   
- localStorage에 저장된 목록, 남은 할 일 목록, 날짜, 시간, 초를 기본적으로 가져온다.
```javascript
function init() {
  loadList();
  remainList();
  getDate();
  getTime();
  setInterval(getTime, 1000);
}

init();
```
### 2. 
- 전역변수로 로컬스토리지에서 사용할 key를 선언해놓고, localStorage에 그대로 보내기 위한 `toDoList` 배열을 생성하였다.
- 로컬스토리지 관련 함수를 `LocalStorage.js`에 분리하였다.
```javascript
// main.js
const localStorageKey = "toDoList";
let toDoList = [];

// LocalStorage.js
//localStorage에 저장된 값 가져오기
function loadList() {
  const loadList = localStorage.getItem(localStorageKey);
  if (loadList !== null) {
    const parseList = JSON.parse(loadList);
    parseList.forEach((item) => {
      createList(item.text);
    });
  }
}
```
### 3. 입력한 항목을 생성하여 화면에 나타내기
- `onAdd` 함수는 input에서 입력된 값으로 항목을 추가하는 역할을 한다.
- 아무 값도 입력하지 않았을 때엔 그냥 리턴하여 종료한다.
- 추가한 항목을 로컬스토리지에도 저장하는 `saveList()`와, 현재 남은 일을 안내하는 `remainList()`함수도 호출한다.
- `createList` 함수는 text를 받아서 실질적으로 화면에 나타내는 역할을 한다. 
- `li`태그를 만들고 내부 html을 세팅하는데, 각 아이템 구분을 위한 `id`도 같이 세팅한다.
- id는 1씩 추가되며, 항목을 추가할 때마다 자동으로 스크롤링된다.
- 로컬스토리지에 보낼 형식을 `localSetting(text, id)`함수로 구현했고, text와 id를 인자로 보낸다.
```javascript
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
```
### 4. 할 일 체크 / 할 일 삭제
- 할 일 목록 중 체크아이콘과 삭제아이콘을 클릭하면 화면은 물론, 로컬스토리지에서도 삭제된다.
- `filter` 메서드를 활용하여 클릭한 리스트와 현재 리스트를 비교하여 업데이트한다.
```javascript
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
list.addEventListener("click", removeList);
```
### 5. 현재 날짜, 시간
- DataTime.js으로 코드를 분리하였다.
```javascript
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

export { getDate, getTime };
```

#### 느낀 점   
원하는 기능을 넣으려고 할수록 공부해야 할 부분이 연쇄적으로 발생했다. 부족함을 많이 느꼈다.  
또한 함수를 여러 개 만들었지만, 각 기능이 동작하는 순서를 헷갈려서 오류를 발생시켰고 결국 많은 시간이 지체되었다. 다른 예제들을 보면서 각 상황별로 정리하는 방법을 습득해야겠다.   
그래도 처음부터 끝까지 혼자 만들고, 주변의 피드백을 받으면서 수정한 첫 결과물이라서 의미는 있다고 생각했다. 이런 미니프로젝트를 꾸준히 해야 나의 문제를 파악하고 고칠 수 있을 거라는 생각이 든다. 더 공부하면서 아쉬웠던 기능을 추가해나가고 싶다.

&nbsp;  
&nbsp;
#### 20210120
 - ver2.1.0 수정!  
![이미지](https://user-images.githubusercontent.com/66292371/105107550-baab1f00-5afb-11eb-848b-d0695e0bc923.gif)
  - 완료한 목록 체크 시, 하단으로 이동하는 기능을 삭제했음
  - 사유: 하단으로 이동된 상태에서 새로운 목록을 추가하면 순서가 뒤죽박죽이 됨
  - 따라서, 체크 해도 자리 그대로 유지.
  
#### 20210305  
  ver2.2.0 수정사항
  - 기능상 수정은 없으며, 복잡하게 얽혀있는 함수를 분리하고 모듈화시키려고 노력했다.
  - 시간/날짜 관련 모듈, 로컬스토리지 관련 모듈을 분리하였다.(이에 대한 설명은 위 **구성** 항목에 추가)
  - 기존에 `overflow-y: scroll`을 넣었었는데, 스크롤 기능은 구현하면서 스크롤이 보이지 않게 코드를 추가하였다.
  ```css
  body {
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  display: none;
} /*특정 부분 스크롤바 없애기*/
.box {
  -ms-overflow-style: none;
}
.box::-webkit-scrollbar {
  display: none;
}
  ```
  
