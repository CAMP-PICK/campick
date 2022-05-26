async function logOut(e) {
  e.preventDefault();
  try {
      localStorage.clear()

      alert('로그아웃이 완료 되었습니다.')

      // 기본 페이지로 이동
      window.location.href = '/';
  } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
  }
}