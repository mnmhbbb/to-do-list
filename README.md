# To Do List

#### 1. 이름 : 할 일 목록 관리 앱

#### 2. 사용한 기술 : HTML, CSS, JavaScrip

#### 3. 기간 : 2020년 12월 20일 하루

#### 4. 주요 기능

![이미지](https://user-images.githubusercontent.com/66292371/102705449-6e39ad00-42cb-11eb-9b62-1fd1c9690fdd.gif)

- 현재 시각 시, 분, 초까지 구현
- 할 일 입력(버튼 클릭 & 키보드 엔터)
- 완료한 목록은 체크 아이콘
- 삭제하고 싶은 목록은 아이콘 클릭하여 삭제
- 목록이 많을 시, 스크롤 내릴 수 있음
- 이때, 현재 추가한 목록으로 스크롤이 자동 포커싱 되게 하였음(`scrollIntoView({block: "center"})`)

#### 5. 느낀 점

아주 간단하고 기본적이지만, 최대한 혼자 고민하고 해결하려고 노력했다. 도무지 풀리지 않을 땐 검색을 통해서 힌트를 얻으려고 했다.  
하지만 아직 응용하는 능력이 부족다고 생각되어 더 많이 고민하고 경험해봐야 겠다.

#### 6. 추가하고 싶은 기능

- 완료한 목록은 하단으로 내려가게 해서 남은 리스트만 위에 보이게 하기
- 할 일이 몇 개 남았는지 안내하는 문구 추가하기
- 새로고침 해도 목록이 사라지지 않게 하려면???

#### + 추가한 기능

- 입력 클릭 버튼 위치가 애매해서 인풋 옆으로 옮기고, `keydown` 이벤트를 사용해서 평소엔 안보이다가 키보드 입력이 되었을 때 클릭 버튼이 생기게 했음. 반대로 키보드 입력하던 것을 모두 지우면 클릭 버튼이 다시 사라지는 기능은 해결 중이다.

  > 해결

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

  - x 버튼이 아니라 완료체크 버튼에 `data-id`를 넣어서 완료된 상태를 체크해야겠다.

  - 완료 체크 부분 성공은 했는데 뭔가 지저분하다.

  ```javascript
  //완료된 목록
  items.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const target = e.target;
    const toBeDeleted = document.querySelector(`.items__row[data-id="${id}"]`);
    if (id) {
      toBeDeleted.remove();
      input.focus();
    }
    if (target.classList.contains("far")) {
      target.className = "far fa-check-circle item__btn";
      target.parentNode.classList.toggle("clicked");
      input.focus();
      if (!target.parentNode.classList.contains("clicked")) {
        target.className = "far fa-circle item__btn";
      }
    }
  });
  ```

  - 201221
    대폭 수정할 예정...
    배열로 바꿔보는 게 어떨까?
