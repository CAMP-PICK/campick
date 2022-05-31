import * as Api from '/api.js';

const showBtn = document.querySelector('#showModal');
const modalDlg = document.querySelector('#image-modal');
const imageModalCloseBtn = document.querySelector('#image-modal-close');
const deletePassword = document.querySelector('#deletePassword');
const deleteUserBtn = document.querySelector('#deleteUserBtn')

addAllEvents();

function addAllEvents() {
    imageModalCloseBtn.addEventListener('click', closeModal)
    showBtn.addEventListener('click', openModal)
    deleteUserBtn.addEventListener('click', deleteUser)
}

function openModal() {
    modalDlg.classList.add('is-active');
};

function closeModal() {
    modalDlg.classList.remove('is-active');
};

async function deleteUser(e) {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const password = deletePassword.value;

    try {
        const data = { email, password }
        await Api.post('/api/userdelete', data);
        localStorage.clear()

        alert('회원 탈퇴가 완료 되었습니다.')

        // 기본 페이지로 이동
        window.location.href = '/';
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

// export {addAllEvents}