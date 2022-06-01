import * as Api from '../api.js';

// querySelector로 변수 지정
const form = document.querySelector('#registerProductForm'); //폼 데이터
const productTitle = document.querySelector('#titleInput'); //제품명
const categorySelect = document.querySelector('#categorySelectBox'); //카테고리
const manufacturer = document.querySelector('#manufacturerInput'); //제조사
const shortDescription = document.querySelector('#shortDescriptionInput'); // 요약 설명
const detailDescription = document.querySelector('#detailDescriptionInput'); // 상세 설명
const file = document.getElementById('files')[0].files[0]; //제품 이미지 파일
const inventory = document.querySelector('#inventoryInput'); // 제품 재고
const productPrice = document.querySelector('#priceInput'); //제품 가격

currentCategoryList();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  form.addEventListener('submit', handleSubmit);
}

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

    categorySelect.appendChild(option);
  }
  return;
}

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData();

  formData.append('file', file);

  let userData = {
    productTitle: productTitle.value,
    categorySelect: categorySelect.value,
    manufacturer: manufacturer.value,
    shortDescription: shortDescription.value,
    detailDescription: detailDescription.value,
    productPrice: productPrice.value,
  };

  formData.append('data', userData);

  console.log(formData.get('file'));
  console.log(formData.get('data')); //{imageName : ""}
}

addAllEvents();
