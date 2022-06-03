import * as Api from '../api.js';
import {
  appendNavigationBar,
  appendAccountUserNavigationBar,
} from '../useful-functions.js';

const email = localStorage.getItem('email');
const token = localStorage.getItem('token');
let user = {};

// define element
const modalDlg = document.querySelector('#image-modal');
const deletePassword = document.querySelector('#deletePassword');
const accountSection = document.querySelector('.accountSection');

const init = async () => {
  appendNavigationBar();
  appendAccountUserNavigationBar(token);
  await fetchUser();
  render(user);
  addEvent();
};

const render = () => {
  if (email == 'manager@test.com') {
    accountSection.innerHTML = `<section class="section">
      <h1 class="title" style="font-family: 'Noto Sans KR', sans-serif; margin-left: 2em">관리자 페이지</h1>
      <h2 class="subtitle" style="font-family: 'Noto Sans KR', sans-serif; margin-left: 3em">
        상품 추가, 삭제 등 상품 관리를 할 수 있는 공간입니다.
      </h2>
    </section>
    <div class="tile is-parent" style="font-family: 'Noto Sans KR', sans-serif">
      <article class="tile is-child box" style="padding-left:3em">
        <a href="../product_sell/product_sell.html">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-cart-plus"></i>
            </span>
            상품등록
          </p>
        </a>
        <p class="subtitle">상품 정보를 등록하여, 판매를 시작할 수 있습니다.</p>
      </article>
      <article class="tile is-child box" style="padding-left:3em">
        <a href="/product_category">
          <p class="title">
            <span class="icon">
            <i class="fa-solid fa-pencil"></i>
            </span>
            카테고리 관리
          </p>
        </a>
        <p class="subtitle">카테고리를 추가/수정/삭제 할 수 있습니다.</p>
      </article>
      <article class="tile is-child box" style="padding-left:3em">
        <a href="/admin-order-list">
          <p class="title">
            <span class="icon">
            <i class="fa-solid fa-credit-card"></i>
            </span>
            주문 관리
          </p>
        </a>
        <p class="subtitle">회원별 주문을 조회/수정/삭제 할 수 있습니다.</p>
      </article>
    </div>`;
  } else {
    // 일반사용자
    accountSection.innerHTML = `<section class="section">
      <h1 class="title" style="font-family: 'Noto Sans KR', sans-serif; margin-left: 2em">계정관리</h1>
      <h2 class="subtitle" style="font-family: 'Noto Sans KR', sans-serif; margin-left: 3em">
        주문조회, 회원정보 관리, 회원탈퇴를 할 수 있습니다.
      </h2>
    </section>
    <div class="tile is-parent" style="font-family: 'Noto Sans KR', sans-serif">
      <article class="tile is-child box" style="padding-left:3em">
        <a href="/order-list">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-credit-card"></i>
            </span>
            주문조회
          </p>
        </a>
        <p class="subtitle">지난 주문 내역을 확인, 취소할 수 있습니다.</p>
      </article>
      <article class="tile is-child box" style="padding-left:3em">
        <a href="/mypage">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-gear"></i>
            </span>
            회원정보 관리
          </p>
        </a>
        <p class="subtitle">회원 정보를 확인, 수정할 수 있습니다.</p>
      </article>
      <article class="tile is-child box" style="padding-left:3em">
        <a href="#" id="deleteAccount">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-user-slash"></i>
            </span>
            회원탈퇴
          </p>
        </a>
        <p class="subtitle">모든 정보를 안전하게 삭제한 후 탈퇴할 수 있습니다.</p>
      </article>
    </div>`;
  }
};

const addEvent = () => {
  const imageModalCloseBtn = document.querySelector('#image-modal-close');
  const deleteAccountBtn = document.querySelector('#deleteAccount');
  const confirmDeleteUserBtn = document.querySelector('#deleteUserBtn');

  imageModalCloseBtn.addEventListener('click', closeModal);
  deleteAccountBtn.addEventListener('click', openModal);
  confirmDeleteUserBtn.addEventListener('click', deleteUser);
};

const openModal = () => {
  modalDlg.classList.add('is-active');
};

const closeModal = () => {
  modalDlg.classList.remove('is-active');
};

const fetchUser = () => {
  try {
    user = Api.get(`/api/user/email/${email}`);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

const deleteUser = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('email');
  const password = deletePassword.value;

  try {
    const data = { email, password };
    await Api.post('/api/order/alldelete', { email });
    await Api.post('/api/user/delete', data);
    localStorage.clear();

    alert('회원 탈퇴가 완료 되었습니다.');

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`${err.message}`);
  }
};

init();
