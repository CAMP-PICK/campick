import * as Api from '../api.js';

// querySelector로 변수 지정
const form = document.querySelector("#registerProductForm"); //폼 데이터
const selectCategory = document.querySelector("#categorySelectBox"); //카테고리 영역

//수정 할 상품 url에서 받아오기
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParams = url.searchParams;
const editProductName = urlParams.get('name');

currentCategoryList()
currentProductList();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  form.addEventListener("submit", handleSubmit);
}

//현재 생성되어있는 카테고리를 보여주는 함수
async function currentCategoryList(){
  //카테고리list api 요청
  const data = await Api.get(`/api/productCategory/list`);
  for(let i=0; i<data.length; i++) {
    //카테고리 하나씩 꺼내기
    const productCategory = data[i];

    //생성되어있는 카테고리를 선택할 수 있도록 option추가
    const option = document.createElement("option");
    const categoryOption = document.createTextNode(productCategory);
    option.appendChild(categoryOption)

    selectCategory.appendChild(option);
  }

  return;
}
  
async function currentProductList(){
  //수정 할 제품list api 요청
  const productData = await Api.get(`/api/product/list/${editProductName}`)
  const {productName, productCategory, productImage, productManuf, productShortDes, productLongDes, productPrice} = productData;

  //수정 페이지에 기존 상품 데이터 입력
  form.innerHTML = `
  <p class="title is-5 has-text-primary">제품을 수정해 보세요</p>
  <div class="field">
    <label class="label" for="titleInput">제품 이름</label>
    <div class="control">
      <input
        class="input"
        id="titleInput"
        type="text"
        value="${productName}"
        autocomplete="on"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="categorySelectBox">카테고리</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select id="categorySelectBox">
          <option value="">카테고리를 선택해 주세요.</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label" for="manufacturerInput">제조사</label>
    <div class="control">
      <input
        class="input"
        id="manufacturerInput"
        type="text"
        value="${productManuf}"
        autocomplete="on"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="shortDescriptionInput">요약 설명</label>
    <div class="control">
      <textarea
        class="textarea"
        id="shortDescriptionInput"
        rows="3"
        autocomplete="on"
      >${productShortDes}</textarea>
    </div>
  </div>

  <div class="field">
    <label class="label" for="detailDescriptionInput"
      >상세 설명</label
    >
    <div class="control">
      <textarea
        class="textarea"
        id="detailDescriptionInput"
        rows="8"
        autocomplete="on"
      >${productLongDes}</textarea>
    </div>
  </div>

  <div class="field is-fullwidth">
    <label class="label" for="files">제품 사진</label>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input
            class="file-input"
            id="files"
            type="file"
          />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label"> 사진 업로드 </span>
      </span>
      <span class="file-name" id="fileNameSpan">
        사진파일 (png, jpg, jpeg)
      </span>
    </label>
  </div>

  <div class="field">
    <label class="label" for="inventoryInput">재고</label>
    <div class="control">
      <input
        class="input"
        id="inventoryInput"
        type="number"
        value="10"
        autocomplete="on"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="priceInput">가격</label>
    <div class="field">
      <div class="control has-icons-right">
        <input
          class="input"
          id="priceInput"
          type="number"
          value="${productPrice}"
          autocomplete="on"
        />
        <span class="icon is-small is-right"> 원 </span>
      </div>
    </div>
  </div>

  <div
    class="field is-grouped is-grouped-multiline mt-3"
    id="keywordContainer"
  ></div>

  <div class="mt-5">
    <button class="button is-primary is-fullwidth" id="submitButton" type="submit">
      수정
    </button>
  </div>
    `;
  return;
}

async function handleSubmit(e) {
  e.preventDefault();

  // querySelector로 변수 지정(함수 밖에서 정의하니 데이터가 안읽혀서 가져옴)
  const productTitle = document.querySelector("#titleInput"); //제품명
  const categorySelect = document.querySelector("#categorySelectBox"); //카테고리
  const manufacturer = document.querySelector("#manufacturerInput"); //제조사
  const shortDescription = document.querySelector("#shortDescriptionInput"); // 요약 설명
  const detailDescription = document.querySelector("#detailDescriptionInput"); // 상세 설명
  const files = document.getElementById("files"); //제품 이미지 파일
  const inventory = document.querySelector("#inventoryInput"); // 제품 재고
  const productPrice = document.querySelector("#priceInput"); //제품 가격
  const formData = new FormData();

  try{
    //수정할 물품 데이터
    formData.append("productName", productTitle.value);
    formData.append("productCategory", categorySelect.value);
    formData.append("productManuf", manufacturer.value);
    formData.append("productShortDes", shortDescription.value);
    formData.append("productLongDes", detailDescription.value);
    formData.append("productPrice", productPrice.value);
    // const inventory = inventory.value; // 제품 재고 router가 없어서 임시로 막아둠
    //파일이 배열로 들어와서 꺼내서 formData에 넣어주는 코드

    if(files.files[0] === undefined || files.files.length === 0 ) {
      const productData = await Api.get(`/api/product/list/${editProductName}`)
      const {productImage} = productData
      return productImage;
    } else {
      for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
      }
    }

    await fetch(`http://localhost:3000/api/product/edit/${editProductName}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => ("Error occured", err));

    alert(`정상 수정되었습니다.`);

    //수정한 상품 페이지로 이동
    window.location.href = `/product_detail/?name=${productTitle.value}`;
  } catch(err) {
    alert(`${err.message}`);
  }
}

addAllEvents();