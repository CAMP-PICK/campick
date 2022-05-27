import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// querySelector로 변수 지정

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    submitButton.addEventListener('click', handleSubmit);
  }
  
  // 회원가입 진행
  async function handleSubmit(e) {
    e.preventDefault();
  
    const titleInput = titleInput.value; //제품명
    const categorySelectBox = categorySelectBox.value; //카테고리
    const manufacturerInput = manufacturerInput.value; //제조사
    const shortDescriptionInput = shortDescriptionInput.value; // 요약 설명
    const detailDescriptionInput = detailDescriptionInput.value; // 상세 설명
    
  
    // 잘 입력했는지 확인
    const isFullNameValid = fullName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;
  
    if (!isFullNameValid || !isPasswordValid) {
      return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
    }
  
    if (!isEmailValid) {
      return alert('이메일 형식이 맞지 않습니다.');
    }
  
    if (!isPasswordSame) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
  
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
  