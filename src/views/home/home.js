import * as Api from "/api.js";
import {randomId, navigationBar} from "/useful-functions.js";

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
if (localStorage.getItem("token") !== null) {
  document.querySelector("#insertItem").insertAdjacentHTML(
    "afterbegin",
    `<a href="/" id="logoutBtn" class="button is-dark is-inverted">
    <li><strong>로그아웃</strong></li>
  </a>
  <a href="/account" class="button is-dark is-inverted">
    <li><strong>계정관리</strong></li>
  </a>
  <a href="/cart" class="button is-dark is-inverted">
    <span class="icon">
      <i class="fas fa-cart-shopping"></i>
    </span>
    <li><strong>장바구니</strong></li>
  </a>`
  );
} else {
  document.querySelector("#insertItem").insertAdjacentHTML(
    "afterbegin",
    `<a href="/register" class="button is-dark is-inverted">
    <li><strong>회원가입</strong></li>
  </a>
  <a href="/login" class="logoutBtn button is-dark is-inverted">
    <li><strong>로그인</strong></li>
  </a>
  <a href="/account" class="button is-dark is-inverted">
    <li><strong>계정관리</strong></li>
  </a>
  <a href="/cart" class="button is-dark is-inverted">
    <span class="icon">
      <i class="fas fa-cart-shopping"></i>
    </span>
    <li><strong>장바구니</strong></li>
  </a>`
  );
}

const logoutBtn = document.querySelector("#logoutBtn");

addAllEvents();

function addAllEvents() {
  logoutBtn.addEventListener("click", logOut);
}

async function logOut(e) {
  e.preventDefault();
  try {
      localStorage.clear()

      alert('로그아웃이 완료 되었습니다.')

      // 기본 페이지로 이동
      window.location.href = '/';
  } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
  }
}