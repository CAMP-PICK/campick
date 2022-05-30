import { GUEST_MENUS, USER_MENUS, MENU_LIST } from './constants.js';

// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
  return parseInt(string.replace(/(,|개|원)/g, ''));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

// menu navbar
export const appendNavigationBar = () => {
  document.querySelector('#insertMenu').insertAdjacentHTML(
    'afterbegin',
    `${MENU_LIST.map(
      (list) => `<a href="${list.to}" class="button is-dark is-inverted">
      ${
        list.icon
          ? `<span class="icon">
      <i class="${list.icon}"></i>
    </span>`
          : ''
      }
    <strong>${list.name}</strong>
  </a>`
    ).join('')}`
  );
};

// user navbar
export const appendUserNavigationBar = (token) => {
  if (token) {
    document.querySelector('#insertItem').insertAdjacentHTML(
      'afterbegin',
      `${USER_MENUS.map(
        (menu) =>
          `<a href="${menu.to}" id="${
            menu.id
          }" class="button is-dark is-inverted">
          ${
            menu.icon
              ? `<span class="icon">
          <i class="${menu.icon}"></i>
        </span>`
              : ''
          }
            <li>
              <strong>${menu.name}</strong>
            </li>
          </a>`
      ).join('')}`
    );
  } else {
    document.querySelector('#insertItem').insertAdjacentHTML(
      'afterbegin',
      `${GUEST_MENUS.map(
        (menu) => `
      <a href="${menu.to}" id="${menu.id}" class="button is-dark is-inverted">
        ${
          menu.icon
            ? `<span class="icon">
        <i class="${menu.icon}"></i>
      </span>`
            : ''
        }
        <li>
          <strong>${menu.name}</strong>
        </li>
      </a>`
      ).join('')}`
    );
  }

  // 로그아웃 버튼 클릭시 로그아웃처리
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
};
