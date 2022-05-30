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
                  <li id="manufacturerTag">${productDetail.productCategory}</li>
                </ul>
              </div>
              <div class="content">
                <p class="subtitle is-3 is-family-monospace" id="titleTag">
                  ${productDetail.productName}
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

//버튼 querySelector로 변수 지정
const delButton = document.querySelector("#submitDelButton");
const editButton = document.querySelector("#submitEditButton");

// 제품 상세 페이지 삭제
async function deleteSubmit(e) {
  e.preventDefault();

  try{
    await Api.delete(`/api/product/del/${productName}`);

    alert('등록된 제품이 삭제 되었습니다.');
    //창 새로고침
    window.location.href = `/category`;
  } catch(err) {
    alert(`${err.message}`);
  }
}

//제품 상세 페이지 수정
async function editSubmit(e){
  e.preventDefault();

  try{
    const data = {selectCategoryNeme, editCategoryName};
    await Api.post(`/api/productCategory/edit/${productName}`, data);
    
    alert('수정 화면으로 이동합니다');
    //제품 등록 페이지로 이동
    window.location.href = `/product_sell/?name=${productName}`;
  } catch(err) {
    alert(`${err.message}`);
  }
}

//호출
delButton.addEventListener("click", deleteSubmit);
editButton.addEventListener("click", deleteSubmit);

await fetchProductDetail();
const logoutBtn = document.querySelector('#logoutBtn');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
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
