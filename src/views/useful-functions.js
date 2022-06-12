import { GUEST_MENUS, USER_MENUS, MENU_LIST, USER_MENUS_ACCOUNT } from './constants.js';
import * as Api from '/api.js';

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
      (list) => `<a href="${list.to}" class="button is-ghost" style="margin-right: 3px">
      ${
        list.icon
          ? `<span class="icon">
      <i class="${list.icon}"></i>
    </span>`
          : ''
      }
    <strong style="font-family: 'Noto Sans KR', sans-serif">${list.name}</strong>
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
          `<a href="${menu.to}" id="${menu.id}" class="button is-ghost" style="margin-right: 3px">
          ${
            menu.icon
              ? `<span class="icon">
          <i class="${menu.icon}"></i>
        </span>`
              : ''
          }
            <li>
              <strong style="font-family: 'Noto Sans KR', sans-serif">${menu.name}</strong>
            </li>
          </a>`
      ).join('')}`
    );
  } else {
    document.querySelector('#insertItem').insertAdjacentHTML(
      'afterbegin',
      `${GUEST_MENUS.map(
        (menu) => `
      <a href="${menu.to}" id="${menu.id}" class="button is-ghost" style="margin-right: 3px">
        ${
          menu.icon
            ? `<span class="icon">
        <i class="${menu.icon}"></i>
      </span>`
            : ''
        }
        <li>
          <strong style="font-family: 'Noto Sans KR', sans-serif">${menu.name}</strong>
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

// account user navbar
export const appendAccountUserNavigationBar = (token) => {
  if (token) {
    document.querySelector('#insertItem').insertAdjacentHTML(
      'afterbegin',
      `${USER_MENUS_ACCOUNT.map(
        (menu) =>
          `<a href="${menu.to}" id="${menu.id}" class="button is-ghost" style="margin-right: 3px">
          ${
            menu.icon
              ? `<span class="icon">
          <i class="${menu.icon}"></i>
        </span>`
              : ''
          }
            <li>
              <strong style="font-family: 'Noto Sans KR', sans-serif">${menu.name}</strong>
            </li>
          </a>`
      ).join('')}`
    );
  } else {
    document.querySelector('#insertItem').insertAdjacentHTML(
      'afterbegin',
      `${GUEST_MENUS.map(
        (menu) => `
      <a href="${menu.to}" id="${menu.id}" class="button is-ghost" style="margin-right: 3px">
        ${
          menu.icon
            ? `<span class="icon">
        <i class="${menu.icon}"></i>
      </span>`
            : ''
        }
        <li>
          <strong style="font-family: 'Noto Sans KR', sans-serif">${menu.name}</strong>
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

export const topButton = () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML(
    'afterbegin',
    '<button id="topBtn" class="button is-dark is-small is-rounded" style="position: fixed; bottom:50px; right: 50px; z-index:1"><i class="fa-solid fa-arrow-up"></i></button>'
  );
  const topBtn = document.querySelector('#topBtn');
  topBtn.addEventListener('click', () => {
    scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
};

//상품 페이지 정렬 기능 구현
const section = document.querySelector('.section');
//카테고리 별 상품을 골라 정렬하기 위해 카테고리 정보를 url에서 받아오기
const urlStr = window.location.pathname;

//각 카테고리 페이지에 버튼 고정
export const sortBtn = () => {
  section.insertAdjacentHTML(
    `afterbegin`,
    `<div class="product-sort">
  <button class="button is-small sort-btn name-sort" style="font-family: 'Noto Sans KR', sans-serif"><b>이름순 정렬</b></button>
  <button class="button is-small sort-btn price-sort" style="font-family: 'Noto Sans KR', sans-serif"><b>가격순 정렬</b></button>
  <button class="button is-small sort-btn newest-sort" style="font-family: 'Noto Sans KR', sans-serif">
    <b>최신순 정렬</b>
  </button>
</div>`
  );
};

//정렬 기능 구현
export const productSort = () => {
  const priceSort = document.querySelector('.price-sort');
  const nameSort = document.querySelector('.name-sort');
  const newestSort = document.querySelector('.newest-sort');
  const content = document.querySelector('#producItemContainer');

  //가격순 정렬-오름차순
  priceSort.addEventListener('click', async () => {
    const data = await Api.get(`/api/product/list`);

    //urlStr을 통해 필터링 할 조건 얻기
    const filterCategory = MENU_LIST.filter((menu) => menu.to + '/' == urlStr);
    const categoryKeyword = filterCategory[0].name;

    //해당 카테고리가 아닌 데이터는 없애기
    let filterData = data.filter((el) => el.productCategory === categoryKeyword);

    //만약 전체상품 카테고리라면 기존 data를 입력
    if (categoryKeyword === '전체상품') {
      filterData = data;
    }

    //필터링한 배열로 정렬
    filterData.sort((a, b) => {
      return a.productPrice - b.productPrice;
    });

    content.innerHTML = '';

    content.insertAdjacentHTML(
      'beforeend',
      `${filterData
        .map(
          (product) =>
            `
            <div class="message product-item imageSort" data-category-name="${product.productCategory}" data-product-name="${product.productName}">
              <div class="media-left">
                <figure class="image">
                  <img src="${product.productImage}" alt="제품 이미지" />
                </figure>
              </div>
              <div class="media-content">
                  <div class="content">
                    <p class="title">
                      ${product.productName}
                    </p>
                    <p class="description">
                      ${product.productShortDes}
                    </p>
                    <p class="price">${addCommas(product.productPrice)}원</p>
                  </div>
                </div>  
              </div>
            `
        )
        .join('')}`
    );

    //제품 클릭 시 제품 상세페이지로 이동
    const attachEvent = () => {
      const items = document.querySelectorAll('.product-item');
      items.forEach((item) => {
        item.addEventListener('click', function () {
          const productName = this.getAttribute('data-product-name');
          window.location.href = `/product_detail/?name=${productName}`;
        });
      });
    };
    attachEvent();
  });

  //이름순 정렬
  nameSort.addEventListener('click', async () => {
    const data = await Api.get(`/api/product/list`);

    //urlStr을 통해 필터링 할 조건 얻기
    const filterCategory = MENU_LIST.filter((menu) => menu.to + '/' == urlStr);
    const categoryKeyword = filterCategory[0].name;

    //해당 카테고리가 아닌 데이터는 없애기
    let filterData = data.filter((el) => el.productCategory === categoryKeyword);

    //만약 전체상품 카테고리라면 기존 data를 입력
    if (categoryKeyword === '전체상품') {
      filterData = data;
    }

    //필터링한 배열로 정렬
    filterData.sort((a, b) => {
      return a.productPrice - b.productPrice;
    });

    filterData.sort((a, b) => {
      if (a.productName > b.productName) return 1;
      if (a.productName === b.productName) return 0;
      if (a.productName < b.productName) return -1;
    });

    content.innerHTML = '';

    content.insertAdjacentHTML(
      'beforeend',
      `${filterData
        .map(
          (product) =>
            `
            <div class="message product-item imageSort" data-category-name="${product.productCategory}" data-product-name="${product.productName}">
              <div class="media-left">
                <figure class="image">
                  <img src="${product.productImage}" alt="제품 이미지" />
                </figure>
              </div>
              <div class="media-content">
                  <div class="content">
                    <p class="title">
                      ${product.productName}
                    </p>
                    <p class="description">
                      ${product.productShortDes}
                    </p>
                    <p class="price">${addCommas(product.productPrice)}원</p>
                  </div>
                </div>  
              </div>
            `
        )
        .join('')}`
    );

    //제품 클릭 시 제품 상세페이지로 이동
    const attachEvent = () => {
      const items = document.querySelectorAll('.product-item');
      items.forEach((item) => {
        item.addEventListener('click', function () {
          const productName = this.getAttribute('data-product-name');
          window.location.href = `/product_detail/?name=${productName}`;
        });
      });
    };
    attachEvent();
  });

  //최신순 정렬
  newestSort.addEventListener('click', async () => {
    const data = await Api.get(`/api/product/list`);

    //urlStr을 통해 필터링 할 조건 얻기
    const filterCategory = MENU_LIST.filter((menu) => menu.to + '/' == urlStr);
    const categoryKeyword = filterCategory[0].name;

    //해당 카테고리가 아닌 데이터는 없애기
    let filterData = data.filter((el) => el.productCategory === categoryKeyword);

    //만약 전체상품 카테고리라면 기존 data를 입력
    if (categoryKeyword === '전체상품') {
      filterData = data;
    }

    //필터링한 배열로 정렬
    filterData.sort((a, b) => {
      return a.productPrice - b.productPrice;
    });

    filterData.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt === b.createdAt) return 0;
      if (a.createdAt < b.createdAt) return 1;
    });

    content.innerHTML = '';

    content.insertAdjacentHTML(
      'beforeend',
      `${filterData
        .map(
          (product) =>
            `
              <div class="message product-item imageSort" data-category-name="${product.productCategory}" data-product-name="${product.productName}">
                <div class="media-left">
                  <figure class="image">
                    <img src="${product.productImage}" alt="제품 이미지" />
                  </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                      <p class="title">
                        ${product.productName}
                      </p>
                      <p class="description">
                        ${product.productShortDes}
                      </p>
                      <p class="price">${addCommas(product.productPrice)}원</p>
                    </div>
                  </div>  
                </div>
              `
        )
        .join('')}`
    );

    //제품 클릭 시 제품 상세페이지로 이동
    const attachEvent = () => {
      const items = document.querySelectorAll('.product-item');
      items.forEach((item) => {
        item.addEventListener('click', function () {
          const productName = this.getAttribute('data-product-name');
          window.location.href = `/product_detail/?name=${productName}`;
        });
      });
    };
    attachEvent();
  });
};
