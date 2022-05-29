import {
  appendNavigationBar,
  appendUserNavigationBar,
} from '../useful-functions.js';

const token = localStorage.getItem('token');

// Nav Bar 고정
appendNavigationBar();

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
appendUserNavigationBar(token);

const logoutBtn = document.querySelector('#logoutBtn');

addAllEvents();

function addAllEvents() {
  if (logoutBtn) logoutBtn.addEventListener('click', logOut);
}

async function logOut(e) {
  e.preventDefault();
  try {
    localStorage.clear();

    alert('로그아웃이 완료 되었습니다.');

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`${err.message}`);
    ``;
  }
}
