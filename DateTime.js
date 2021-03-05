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
