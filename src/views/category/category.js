import * as Api from '/api.js';
import {
  appendNavigationBar,
  appendUserNavigationBar,
  addCommas,
} from '../useful-functions.js';

const token = localStorage.getItem('token');

// Nav Bar 고정
appendNavigationBar();

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
appendUserNavigationBar(token);

// 상품 리스트 api get 요청
const fetchProductList = async () => {
  try {
    const productList = await Api.get('/api/product/list');
    console.log(productList);
    document.querySelector('#producItemContainer').insertAdjacentHTML(
      'afterbegin',
      `${productList
        .map(
          (product) =>
            `
            <div class="message media product-item" data-product-name="${product.productName}">
              <div class="media-left">
                <figure class="image">
                  <img src="./tent1.jpg" alt="제품 이미지" />
                </figure>
              </div>
              <div class="media-content">
                  <div class="content">
                    <p class="title">
                      ${product.productCategory}
                      <span class="tag is-success is-rounded">추천</span>
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
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

const attachEvent = () => {
  const items = document.querySelectorAll('.product-item');
  items.forEach((item) => {
    item.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      window.location.href = `/product_detail/?name=${productName}`;
    });
  });
};

await fetchProductList();
attachEvent();

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
