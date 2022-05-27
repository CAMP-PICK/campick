// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분

if (localStorage.getItem("token") == null) {
  navBar.insertAdjacentHTML(
    "afterbegin",
    `<div class="navbar-brand">
      <a href="/home.html">
        <span><i class="fa-solid fa-house title is-size-3"></i></span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons" id="navbutton">
          <a href="/register" class="registerBtn button is-dark">
            <strong>회원가입</strong>
          </a>
          <a href="/login" class="loginBtn button is-dark">
            <strong>로그인</strong>
          </a>
          <a href="/mypage" class="loginBtn button is-dark">
            <strong>마이페이지</strong>
          </a>
          <a href="/cart" class="button is-dark">
            <span class="icon">
              <i class="fas fa-cart-shopping"></i>
            </span>
            <strong>장바구니</strong>
          </a>
        </div>
      </div>
    </div>
    </div>`
  );
} else {
  navBar.insertAdjacentHTML(
    "afterbegin",
    `<div class="navbar-brand">
    <a href="/home.html">
      <span><i class="fa-solid fa-house title is-size-3"></i></span>
    </a>
</div>

<div class="navbar-end">
  <div class="navbar-item">
    <div class="buttons" id="navbutton">
      <a href="/login" class="loginBtn button is-dark">
        <strong>로그아웃</strong>
      </a>
      <a href="/cart" class="button is-dark">
        <span class="icon">
          <i class="fas fa-cart-shopping"></i>
        </span>
        <strong>장바구니</strong>
      </a>
    </div>
  </div>
</div>
</div>`
  );
}