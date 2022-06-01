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
              <img id="productImageTag" src="../../../uploads/${
                productDetail.productImage
              }" />
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
                <h1 id="priceTag">${addCommas(
                  productDetail.productPrice
                )}원</h1>
                <p class="detail-description" id="detailDescriptionTag">
                  ${productDetail.productLongDes}
                </p>
              </div>
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
const delButton = document.querySelector('#submitDelButton');
const editButton = document.querySelector('#submitEditButton');
const cartButton = document.querySelector('#addToCartButton');
const purchaseButton = document.querySelector('#purchaseButton');

// 관리자 계정일때만 버튼 표시
const data = await Api.get(`/api/user/email/${localStorage.getItem('email')}`);
const style = document.createElement('style');
if (data === null || data.role !== 'manager-user') {
  style.innerHTML = `
      #managerButton {
        display: none;
      }
    `;
  document.head.appendChild(style);
}

// 제품 상세 페이지 삭제
async function deleteSubmit(e) {
  e.preventDefault();

  try {
    await Api.delete(`/api/product/del/${productName}`);

    alert('등록된 제품이 삭제 되었습니다.');
    //창 새로고침
    window.location.href = `/category`;
  } catch (err) {
    alert(`${err.message}`);
  }
}

//제품 상세 페이지 수정
async function editSubmit(e) {
  e.preventDefault();

  //수정하기 위해 선택한 제품 이름
  const editProduct = productName;

  try {
    alert('수정 화면으로 이동합니다');
    //제품 수정 페이지로 이동
    window.location.href = `/product_edit/?name=${editProduct}`;
  } catch (err) {
    alert(`${err.message}`);
  }
}

//장바구니 페이지 이동
async function cartSubmit(e) {
  e.preventDefault();

  //장바구니로 보내기 위해 선택한 제품 정보
  const cartProduct = await Api.get(`/api/product/list/${productName}`);
  console.log(cartProduct);
  try {
    localStorage.setItem('cartProduct', JSON.stringify(cartProduct));
    alert('장바구니로 이동합니다');
    //장바구니 페이지로 이동
    window.location.href = `/cart`;
  } catch (err) {
    alert(`${err.message}`);
  }
}

//제품 구매 페이지 이동
async function purchaseSubmit(e) {
  e.preventDefault();

  //장바구니로 보내기 위해 선택한 제품 정보
  const purchaseProduct = await Api.get(`/api/product/list/${productName}`);
  //장바구니로 보내기 위해 선택한 사용자 정보
  const purchaseUser = await Api.get(
    `/api/user/email/${localStorage.getItem('email')}`
  );
  console.log(purchaseProduct);
  console.log(purchaseUser);
  try {
    localStorage.setItem('orderProduct', JSON.stringify(purchaseProduct));
    localStorage.setItem('orderUser', JSON.stringify(purchaseUser));
    alert('구매 페이지로 이동합니다');
    //제품 구매 페이지로 이동
    window.location.href = `/order`;
  } catch (err) {
    alert(`${err.message}`);
  }
}

//호출
delButton.addEventListener('click', deleteSubmit);
editButton.addEventListener('click', editSubmit);
cartButton.addEventListener('click', cartSubmit);
purchaseButton.addEventListener('click', purchaseSubmit);

await fetchProductDetail();
