# To Do List

#### 1. 이름 : 할 일 목록 관리 앱

#### 2. 사용한 기술 : HTML, CSS, JavaScript

#### 3. 기간 : 2020년 12월 21일 ~ 12월 22일
  - 2020.12.21: ver1 - 기본 기능
  - [2020.12.21~22: ver2 - 남은 할일 알려주기](#201222-ver2)
  - [2021.01.20: ver2.1](#20210120)
    - 완성된 페이지: https://mnmhbbb.github.io/to-do-list/

#### 4. 주요 기능

![이미지](https://user-images.githubusercontent.com/66292371/102768656-d9b37580-43c4-11eb-8e60-ad35f4b8ddb0.gif)

- 현재 시각 시, 분, 초까지 구현
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
  - 이번엔 목록을 배열에 담아서 관리하고 `splice`, `push` 등과 같은 배열 메서드를 사용함      
  - 완료 체크한 아이콘은 따로 만든 배열에 담고, 체크한 해당 목록은 하단으로 내려가게, 남은 할 일이 상위에 남게 하였음(아이폰 메모어플 참조)     
  - 이를 통해 현재 남은 할 일의 개수를 안내하는 문구가 즉각적으로 반영되게 하였음      
  - 이전과 동일하게, 키보드 입력이 될 때만 입력 버튼 활성화시킴   
  
#### 느낀 점   
원하는 기능을 넣으려고 할수록 공부해야 할 부분이 연쇄적으로 발생했다. 부족함을 많이 느꼈다.  
또한 함수를 여러 개 만들었지만, 각 기능이 동작하는 순서를 헷갈려서 오류를 발생시켰고 결국 많은 시간이 지체되었다. 다른 예제들을 보면서 각 상황별로 정리하는 방법을 습득해야겠다.   
그래도 처음부터 끝까지 혼자 만들고, 주변의 피드백을 받으면서 수정한 첫 결과물이라서 의미는 있다고 생각했다. 이런 미니프로젝트를 꾸준히 해야 나의 문제를 파악하고 고칠 수 있을 거라는 생각이 든다. 더 공부하면서 아쉬웠던 기능을 추가해나가고 싶다.

```javascript
// 삭제버튼 이벤트리스너
function removeList(e) {
  const target = e.target;
  if (target.classList.contains("fas")) {
    const delLi = target.parentNode;
    list.removeChild(delLi);

    //data-id 설정할 때 id=0으로 설정했는데 localStorage에선 1부터 설정되네
    //그래서 id를 동일하게 비교하기 위해 +1
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
```
내가 클릭한 아이템을 id로 구분하여, 배열에서 빼내려고 했다. 처음에는 `filter` 메서드를 이용하여 조건에 충족하는 배열을 따로 가져오면 되겠다고 생각했는데, 어떤 문제인지 해결하지 못했고, 투두리스트 배열의 전체를 돌면서 id를 하나씩 비교하는 for문을 사용하여서 해결했다. 여기서 내가 클릭한 아이템과 일치하는 인덱스를 가져와서 `splice`로 제거하는 기능을 구현했다. 간단하지만, 처음 해결했을 때 뿌듯했다.   
&nbsp;  
&nbsp;
### 20210120
 - ver2.1 수정!  
![이미지](https://user-images.githubusercontent.com/66292371/105107550-baab1f00-5afb-11eb-848b-d0695e0bc923.gif)
  - 완료한 목록 체크 시, 하단으로 이동하는 기능을 삭제했음
  - 사유: 하단으로 이동된 상태에서 새로운 목록을 추가하면 순서가 뒤죽박죽이 됨
  - 따라서, 체크 해도 자리 그대로 유지.
  
