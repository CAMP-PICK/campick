import * as Api from '/api.js';

window.onload = async function() {
  

  const data = await Api.get(`/api/email/${localStorage.getItem('email')}`);
  
  // 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
  if (localStorage.getItem("token") !== null) {
    document.querySelector("#insertItem").insertAdjacentHTML(
      "afterbegin",
      `<a href="/" id="logoutBtn" class="button is-dark is-inverted">
      <li><strong>로그아웃</strong></li>
    </a>
    <a href="/cart" class="button is-dark is-inverted">
      <span class="icon">
        <i class="fas fa-cart-shopping"></i>
      </span>
      <li><strong>장바구니</strong></li>
    </a>`
    );
  } else {
    document.querySelector("#insertItem").insertAdjacentHTML(
      "afterbegin",
      `<a href="/register" class="button is-dark is-inverted">
      <li><strong>회원가입</strong></li>
    </a>
    <a href="/login" class="logoutBtn button is-dark is-inverted">
      <li><strong>로그인</strong></li>
    </a>
    <a href="/cart" class="button is-dark is-inverted">
      <span class="icon">
        <i class="fas fa-cart-shopping"></i>
      </span>
      <li><strong>장바구니</strong></li>
    </a>`
    );
  }
  
  // 관리자 계정 분리
  // 로그인계정이 관리자
  if (data.role == "manager-user") {
    document.querySelector(".managerSection").insertAdjacentHTML(
      "afterbegin",
      `<section class="section">
      <h1 class="title">관리자 페이지</h1>
      <h2 class="subtitle">
        상품 추가, 삭제 등 상품 관리를 할 수 있는 공간입니다.
      </h2>
    </section>
  
      <div class="tile is-parent">
      <article class="tile is-child box">
        <a href="">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-cart-plus"></i>
            </span>
            상품등록
          </p>
        </a>
        <p class="subtitle">상품 정보를 등록하여, 판매를 시작할 수 있습니다.</p>
      </article>
      <article class="tile is-child box">
        <a href="">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-cart-plus"></i>
            </span>
            목록적기
          </p>
        </a>
        <p class="subtitle">상세 설명입니다.</p>
      </article>
      <article class="tile is-child box">
        <a href="">
          <p class="title">
            <span class="icon">
              <i class="fa-solid fa-cart-plus"></i>
            </span>
            목록적기
          </p>
        </a>
        <p class="subtitle">상세 설명입니다.</p>
      </article>
      </div>`
    );
  } else {
    // 일반사용자
    document.querySelector(".userSection").insertAdjacentHTML(
      "afterbegin",
      `<section class="section">
      <h1 class="title">계정관리</h1>
      <h2 class="subtitle">
        주문조회, 회원정보 관리, 회원탈퇴를 할 수 있습니다.
      </h2>
    </section>
  
      <div class="tile is-parent">
        <article class="tile is-child box">
          <a href="">
            <p class="title">
              <span class="icon">
                <i class="fa-solid fa-credit-card"></i>
              </span>
              주문조회
            </p>
          </a>
          <p class="subtitle">지난 주문 내역을 확인, 취소할 수 있습니다.</p>
        </article>
        <article class="tile is-child box">
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
        <article class="tile is-child box">
          <a href="">
            <p class="title">
              <span class="icon">
                <i class="fa-solid fa-user-slash"></i>
              </span>
              회원탈퇴
            </p>
          </a>
          <p class="subtitle">모든 정보를 안전하게 삭제한 후 탈퇴할 수 있습니다.</p>
        </article>
      </div>`
    );
  }
  
  const logoutBtn = document.querySelector("#logoutBtn");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
  
      alert("로그아웃이 완료 되었습니다.");
  
      // 기본 페이지로 이동
      window.location.href = "/";
    } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
    }
  });
}

