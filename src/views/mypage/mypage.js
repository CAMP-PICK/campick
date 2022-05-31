import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// 요소모음
const submitButton = document.querySelector('#submitButton');
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const currentPasswordInput = document.querySelector('#currentPasswordInput');
const newPasswordInput = document.querySelector('#newPasswordInput');
const newPasswordConfirmInput = document.querySelector(
  '#newPasswordConfirmInput'
);
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const addressInput = document.querySelector('#addressInput');
const userAddress = document.querySelector('#userAddress');
const userAddressDetail = document.querySelector('#userAddressDetail');

addAllEvents();

function addAllEvents() {
  submitButton.addEventListener('click', setUser);
}

// 정보수정 진행

async function setUser(e) {
  e.preventDefault();
  const fullNameInput = fullNameInput.value;
  const currentPasswordInput = currentPasswordInput.value;
  const newPasswordInput = newPasswordInput.value;
  const newPasswordConfirmInput = newPasswordConfirmInput.value;
  const phoneNumberInput = phoneNumberInput.value;
  const addressInput = addressInput.value;
  const userAddress = userAddress.value;
  const userAddressDetail = userAddressDetail.value;
  const data = await Api.get(`/api/email/${localStorage.getItem('email')}`);
  const id = data._id;

  // 잘 입력했는지 확인
  const isFullNameValid = fullNameInput.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid =
    newPasswordInput.length === 0 || newPasswordInput.length >= 4;
  const isPasswordConfirm = newPasswordInput === newPasswordConfirmInput;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordValid) {
    return alert('새로 변경하시는 비밀번호가 4글자 이상인지 확인해 주세요.');
  }

  if (!isPasswordConfirm) {
    return alert('변경하시는 비밀번호와 비밀번호 확인이 일치 하지 않습니다.');
  }
}

// 정보 수정 api 요청
try {
  const data = { fullName, newPassword, address, phoneNumber, password };

  await Api.patch('/api/users', id, data);

  alert(`회원님의 정보가 수정 되었습니다.`);
  // 정보 수정 성공

  // 계정관리 페이지로 이동
  window.location.href = '/account';
} catch (err) {
  console.error(err.stack);
  alert(`${err.message}`);
}

