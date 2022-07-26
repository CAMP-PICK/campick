import * as Api from '../api.js';
import {
  appendNavigationBar,
  appendUserNavigationBar,
} from '../useful-functions.js';

const token = localStorage.getItem('token');

// Nav Bar 고정
appendNavigationBar();

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
appendUserNavigationBar(token);

// querySelector로 변수 지정
const selectCategory = document.querySelector('#selectCategory');
const createCategory = document.querySelector('#createCategoryName');
const editCategory = document.querySelector('#editCategoryName');
const submitCreateButton = document.querySelector('#submitCreateButton');
const submitEditButton = document.querySelector('#submitEditButton');
const submitDelButton = document.querySelector('#submitDelButton');

addAllEvents();
currentCategoryList();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitCreateButton.addEventListener('click', createSubmit);
  submitEditButton.addEventListener('click', editSubmit);
  submitDelButton.addEventListener('click', deleteSubmit);
}

//현재 생성되어있는 카테고리를 보여주는 함수
async function currentCategoryList() {
  //카테고리list api 요청
  const data = await Api.get(`/api/productCategory/list`);

  for (let i = 0; i < data.length; i++) {
    //카테고리 하나씩 꺼내기
    const productCategory = data[i];

    //생성되어있는 카테고리를 선택할 수 있도록 option추가
    const option = document.createElement('option');
    const categoryOption = document.createTextNode(productCategory);
    option.appendChild(categoryOption);

    selectCategory.appendChild(option);
  }
  return;
}

//카테고리 생성하기
async function createSubmit(e) {
  e.preventDefault();

  //추가 할 카테고리 값
  const createCategoryName = createCategory.value;

  try {
    const data = { createCategoryName };
    await Api.post(`/api/productCategory/create`, data);
    alert('카테고리가 추가 되었습니다.');
    //창 새로고침
    window.location.reload();
  } catch (err) {
    alert(`${err.message}`);
  }
}

//카테고리 수정하기
async function editSubmit(e) {
  e.preventDefault();

  //수정하기 위해 선택한 카테고리 값
  const selectCategoryNeme = selectCategory.value;
  //카테고리를 수정 할 값
  const editCategoryName = editCategory.value;

  try {
    const data = { selectCategoryNeme, editCategoryName };
    await Api.post(`/api/productCategory/edit/${selectCategoryNeme}`, data);

    alert('카테고리가 변경 되었습니다.');
    //창 새로고침
    window.location.reload();
  } catch (err) {
    alert(`${err.message}`);
  }
}

//카테고리 삭제하기
async function deleteSubmit(e) {
  e.preventDefault();

  //삭제하기 위해 선택한 카테고리 값
  const selectCategoryName = selectCategory.value;

  try {
    await Api.delete(`/api/productCategory/del/${selectCategoryName}`);

    alert('카테고리가 삭제 되었습니다.');
    //창 새로고침
    window.location.reload();
  } catch (err) {
    alert(`${err.message}`);
  }
}
