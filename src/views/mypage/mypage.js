import * as Api from '/api.js';

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

// const addressInput = document.querySelector('#addressInput');
// const userAddress = document.querySelector('#userAddress');
// const userAddressDetail = document.querySelector('#userAddressDetail');

// 현재 유저 객체
let user = {};

const init = () => {
  fetchUserInfo();
  addEvent();
};

const addEvent = () => {
  // 정보 수정 버튼을 누르면 updateUserInfo 함수 실행
  submitButton.addEventListener('click', updateUserInfo);
};

const setUserInfo = (user) => {
  fullNameInput.value = user.fullName;
  emailInput.value = user.email;
  phoneNumberInput.value = user.phoneNumber;
};

const fetchUserInfo = async () => {
  const email = localStorage.getItem('email');
  try {
    user = await Api.get(`/api/email/${email}`);
    setUserInfo(user);
  } catch (err) {
    alert(`${err.message}`);
  }
};

// 정보수정 진행
const updateUserInfo = (e) => {
  e.preventDefault();
  // input에 있는 각각의 값을 받아온다.
  const fullName = fullNameInput.value;
  const currentPassword = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const newPasswordConfirm = newPasswordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  // 인풋 유효성 검사
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = newPassword.length === 0 || newPassword.length >= 4;
  const isPasswordConfirm = newPassword === newPasswordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isPasswordValid) {
    return alert('새로 변경하시는 비밀번호가 4글자 이상인지 확인해 주세요.');
  }

  if (!isPasswordConfirm) {
    return alert('변경하시는 비밀번호와 비밀번호 확인이 일치 하지 않습니다.');
  }

  // 변경되는 유저 정보 취합
  const userInfo = {
    fullName,
    password: currentPassword,
    newPassword,
    address: '',
    phoneNumber,
  };

  // 유저 정보를 수정하는 api 요청
  patchUserInfo(userInfo);
};

// 유저 정보 수정 api
const patchUserInfo = async (userInfo) => {
  try {
    await Api.patch(`/api/users`, user._id, userInfo);
    alert('정상적으로 수정되었습니다.');
    window.location.href = '/account';
  } catch (err) {
    alert(`${err.message}`);
  }
};

init();
