import * as Api from '/api.js';

// querySelector로 변수 지정
const selectCategory = document.querySelector("#selectCategory");
const editCategoryName = document.querySelector("#editCategoryName");
const submitEditButton = document.querySelector("#submitEditButton");
const submitDelButton = document.querySelector("#submitDelButton");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitEditButton.addEventListener('click', editSubmit);
  submitDelButton.addEventListener('click', delSubmit);
}

//수정하기 위해 선택한 카테고리 값
const selectCategoryValue = selectCategory.value;
//카테고리를 수정 할 값
const editCategoryValue = editCategoryName.value;
  
//수정데이터
async function editSubmit(e) {
  e.preventDefault();
  // 카테고리 수정 api 요청
  try {
    const data = { fullName, email, password };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//삭제데이터
async function delSubmit(e) {
  e.preventDefault();

  const selectCategory = selectCategory.value
  
  // 회원가입 api 요청
  try {
    const data = { fullName, email, password };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
