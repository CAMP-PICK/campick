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

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParams = url.searchParams;
const productName = urlParams.get('name');
const fetchProductDetail = async () => {
  try {
    const productDetail = await Api.get(`/api/product/list/${productName}`);

    document.querySelector('#productDetailContainer').insertAdjacentHTML(
      'afterbegin',
      `
      <div class="tile is-ancestor product-detail-card">
        <div class="tile is-6 is-parent">
          <div class="tile is-child box product-image">
            <figure class="image is-sqaure">
              <img id="productImageTag" src="../category/tent1.jpg" />
            </figure>
          </div>
        </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child box product-detail">
              <div class="tabs">
                <ul>
                  <li id="manufacturerTag">${productDetail.productName}</li>
                  <br>
                  <i class="fa-solid fa-trash" id="submitEditButton"style="margin-left:1em"></i>
                  <i class="fa-solid fa-pencil" id="submitDelButton" style="margin-left:1em"></i>
                </ul>
              </div>
              <div class="content">
                <p class="subtitle is-3 is-family-monospace" id="titleTag">
                  ${productDetail.productCategory}
                </p>
                <h1 id="priceTag">${addCommas(productDetail.productPrice)}원</h1>
                <p class="detail-description" id="detailDescriptionTag">
                  ${productDetail.productLongDes}
                </p>
              </div>
              </div>
              <div class="tile is-child box buttons-container">
                <button class="button is-warning" id="addToCartButton">
                  장바구니 추가하기
                </button>
                <button class="button is-info ml-2" id="purchaseButton">
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>`
    );
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

// //버튼 querySelector로 변수 지정
// const EditButton = document.querySelector("#submitEditButton");
// const DelButton = document.querySelector("#submitDelButton");

// addAllEvents();

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// function addAllEvents() {
//   EditButton.addEventListener('click', editSubmit);
//   DelButton.addEventListener('click', deleteSubmit);
// }

// async function deleteSubmit(e) {
//   e.preventDefault();

//   //삭제하기 위해 선택한 카테고리 값
//   const selectCategoryName = selectCategory.value;

//   try{
//     await Api.delete(`/api/product/del/${productDetail.productName}`);

//     alert('카테고리가 삭제 되었습니다.');
//     //창 새로고침
//     window.location.href = `/category`;
//   } catch(err) {
//     alert(`${err.message}`);
//   }
// }

await fetchProductDetail();
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
