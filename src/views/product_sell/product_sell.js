import * as Api from '../api.js';

// querySelector로 변수 지정
const form = document.querySelector('#registerProductForm'); //폼 데이터
const productTitle = document.querySelector('#titleInput'); //제품명
const categorySelect = document.querySelector('#categorySelectBox'); //카테고리
const manufacturer = document.querySelector('#manufacturerInput'); //제조사
const shortDescription = document.querySelector('#shortDescriptionInput'); // 요약 설명
const detailDescription = document.querySelector('#detailDescriptionInput'); // 상세 설명
const file = document.getElementById('file'); //제품 이미지 파일
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

  try {
    //추가할 물품 데이터
    formData.append('productName', productTitle.value);
    formData.append('productCategory', categorySelect.value);
    formData.append('productManuf', manufacturer.value);
    formData.append('productShortDes', shortDescription.value);
    formData.append('productLongDes', detailDescription.value);
    formData.append('productPrice', productPrice.value);
    formData.append('productStock', inventory.value);
    formData.append('file', file.files[0]);

    await fetch(`/api/product/create`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => ('Error occured', err));

    alert(`정상 등록되었습니다.`);

    //선택한 카테고리 페이지로 이동
    window.location.href = `/product_detail/?name=${productTitle.value}`;
  } catch (err) {
    alert(`${err.message}`);
  }
}

addAllEvents();
