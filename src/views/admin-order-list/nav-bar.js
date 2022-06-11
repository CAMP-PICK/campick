import {
  appendNavigationBar,
  appendUserNavigationBar,
  topButton,
} from '../useful-functions.js';

const token = localStorage.getItem('token');

// Nav Bar 고정
appendNavigationBar();

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
appendUserNavigationBar(token);

// top 버튼
topButton();