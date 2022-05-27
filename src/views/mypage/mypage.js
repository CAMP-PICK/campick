import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

const btn1 = document.querySelector('#testBtn1')
const btn2 = document.querySelector('#submitButton')

const nameInput = document.querySelector('#nameInput');
const passwordInput = document.querySelector('#passwordInput');
const newPasswordInput = document.querySelector('#newPasswordInput');
const confirmNewPasswordInput = document.querySelector('#confirmNewPasswordInput');
const telInput = document.querySelector('#telInput');
const addressInput = document.querySelector('#addressInput');

addAllEvents();

function addAllEvents() {
    btn1.addEventListener('click', logOut)
    btn2.addEventListener('click', setUser)
}


// 테스트 api(현재 사용 안함)
async function test(e) {
    e.preventDefault();
    const result = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);
    alert(result);
}

async function logOut(e) {
    e.preventDefault();
    try {
        sessionStorage.clear()

        alert('로그아웃이 완료 되었습니다.')

        // 기본 페이지로 이동
        window.location.href = '/';
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

async function setUser(e) {
    e.preventDefault();

    const fullName = nameInput.value;
    const password = passwordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;
    const phoneNumber = telInput.value;
    const address = addressInput.value;
    const id = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);

    // 잘 입력했는지 확인
    const isPasswordValid = (newPassword.length === 0 || newPassword.length >= 4);
    const isPasswordConfirm = newPassword === confirmNewPassword;

    if (!isPasswordValid) {
        return alert(
            '새로 변경하시는 비밀번호가 4글자 이상인지 확인해 주세요.'
        );
    }

    if (!isPasswordConfirm) {
        return alert(
            '변경하시는 비밀번호와 비밀번호 확인이 일치 하지 않습니다.'
        );
    }

    // 정보 수정 api 요청
    try {
        const data = { fullName, newPassword, address, phoneNumber, password
};

        // await Api.patch(`/api/users/${id}`, data);
        await Api.patch(`/api/users`, id, data);

        alert(`회원님의 정보가 수정 되었습니다.`);

        // 정보 수정 성공

        // 기본 페이지로 이동
        window.location.href = '/';
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}