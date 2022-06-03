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
    const content = document.querySelector('.content');
    const imageTag = document.querySelector('.product-image');
    const tabs = document.querySelector('.tabs');

    imageTag.insertAdjacentHTML(
      'afterbegin',
      `<figure class="image is-sqaure">
<img id="productImageTag" src="${productDetail.productImage}" />
</figure>`
    );
    tabs.insertAdjacentHTML(
      'afterbegin',
      `<ul>
      <li id="manufacturerTag">${productDetail.productCategory}</li>
    </ul>`
    );
    content.insertAdjacentHTML(
      'afterbegin',
      `<p class="subtitle is-3" id="titleTag">
    ${productDetail.productName}
  </p>
  <h1 id="priceTag">${addCommas(productDetail.productPrice)}원</h1>
  <p class="detail-description" id="detailDescriptionTag">
    ${productDetail.productLongDes}
  </p>`
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

//호출
delButton.addEventListener('click', deleteSubmit);
editButton.addEventListener('click', editSubmit);
cartButton.addEventListener('click', cartSubmit);
purchaseButton.addEventListener('click', purchaseSubmit);

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
    const cart = JSON.parse(localStorage.getItem('shopping-cart'));
    if (cart) {
      const idx = cart.findIndex(({ _id }) => _id == cartProduct._id);
      if (idx > -1) {
        cart[idx]['quantity'] += 1;
      } else {
        cart.push({ ...cartProduct, quantity: 1 });
      }
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
    } else {
      localStorage.setItem(
        'shopping-cart',
        JSON.stringify([{ ...cartProduct, quantity: 1 }])
      );
    }

    const yes = confirm(
      '장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?'
    );
    if (yes) {
      window.location.replace('/cart');
    }
  } catch (err) {
    alert(`${err.message}`);
  }
}

//제품 구매 페이지 이동
async function purchaseSubmit(e) {
  e.preventDefault();

  if (!localStorage.getItem('token')) {
    alert('로그인을 먼저 해주세요!');
    window.location.replace(`/login`);
  }

  //장바구니로 보내기 위해 선택한 제품 정보
  const purchaseProduct = await Api.get(`/api/product/list/${productName}`);
  //장바구니로 보내기 위해 선택한 사용자 정보
  const purchaseUser = await Api.get(
    `/api/user/email/${localStorage.getItem('email')}`
  );
  try {
    localStorage.setItem(
      'shopping-order',
      JSON.stringify({
        deliveryCost: 3000,
        grandTotal: purchaseProduct.productPrice + 3000,
        itemsTotal: purchaseProduct.productPrice,
        items: [{ ...purchaseProduct, quantity: 1 }],
      })
    );
    localStorage.setItem('orderUser', JSON.stringify(purchaseUser));
    //제품 구매 페이지로 이동
    window.location.replace(`/order`);
  } catch (err) {
    alert(`${err.message}`);
  }
}

await fetchProductDetail();
