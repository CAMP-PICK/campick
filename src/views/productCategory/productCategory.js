import * as Api from '/api.js';

// querySelector로 변수 지정
const selectCategory = document.querySelector("#selectCategory");
const editCategoryName = document.querySelector("#editCategoryName");
const submitEditButton = document.querySelector("#submitEditButton");
const submitDelButton = document.querySelector("#submitDelButton");
const testCategoryList = document.querySelector("#testCategoryList");

addAllElements();
addAllEvents();
categoryList();

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

//현재 카테고리 목록 보여주는 함수
async function categoryList(){
  //카테고리list api 요청
  //const data = { categoryName }
  const data = await Api.get(`api/productCategory/list`);

  console.log(data)
}