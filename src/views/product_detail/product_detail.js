import * as Api from '/api.js';
import {
  appendNavigationBar,
  appendUserNavigationBar,
  addCommas,
} from '../useful-functions.js';

const token = localStorage.getItem('token');

// Nav Bar 고정
appendNavigationBar();

// 로컬 스토리지 토큰으로 로그인/비로그인 상태 구분
appendUserNavigationBar(token);

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParams = url.searchParams;
const productName = urlParams.get('name');
const fetchProductDetail = async () => {
  try {
    const productDetail = await Api.get(`/api/product/list/${productName}`);

    document.querySelector('#productDetailContainer').insertAdjacentHTML(
      'afterbegin',
      `
      <div class="tile is-ancestor product-detail-card">
        <div class="tile is-6 is-parent">
          <div class="tile is-child box product-image">
            <figure class="image is-sqaure">
              <img id="productImageTag" src="../category/tent1.jpg" />
            </figure>
          </div>
        </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child box product-detail">
              <div class="tabs">
                <ul>
                  <li id="manufacturerTag">${productDetail.productCategory}</li>
                </ul>
              </div>
              <div class="content">
                <p class="subtitle is-3 is-family-monospace" id="titleTag">
                  ${productDetail.productName}
                </p>
                <h1 id="priceTag">${addCommas(productDetail.productPrice)}원</h1>
                <p class="detail-description" id="detailDescriptionTag">
                  ${productDetail.productLongDes}
                </p>
              </div>
              </div>
              <div class="tile is-child box buttons-container">
                <button class="button is-warning" id="addToCartButton">
                  장바구니 추가하기
                </button>
                <button class="button is-info ml-2" id="purchaseButton">
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>`
    );
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

//버튼 querySelector로 변수 지정
const delButton = document.querySelector("#submitDelButton");
const editButton = document.querySelector("#submitEditButton");

// 제품 상세 페이지 삭제
async function deleteSubmit(e) {
  e.preventDefault();

  try{
    await Api.delete(`/api/product/del/${productName}`);

    alert('등록된 제품이 삭제 되었습니다.');
    //창 새로고침
    window.location.href = `/category`;
  } catch(err) {
    alert(`${err.message}`);
  }
}

//제품 상세 페이지 수정
async function editSubmit(e){
  e.preventDefault();

//수정하기 위해 선택한 제품 이름
const editProduct = productName;

  try{
    alert('수정 화면으로 이동합니다');
    //제품 등록 페이지로 이동
    window.location.href = `/product_sell/?name=${productName}`;

    // 수정할 제품 이름에 대한 데이터 요청
    await Api.get(`/api/product/edit/${editProduct}`);
    console.log(editProduct);
    console.log(productName);

    // 수정 페이지에 기존 데이터 입력
    document.querySelector("#registerProductForm").insertAdjacentHTML(`
    <p class="title is-5 has-text-primary">제품을 수정해 보세요</p>
              <div class="field">
                <label class="label" for="titleInput">제품 이름</label>
                <div class="control">
                  <input
                    class="input"
                    id="titleInput"
                    type="text"
                    placeholder="${productName}"
                    autocomplete="on"
                  />
                </div>
              </div>
  
              <div class="field">
                <label class="label" for="categorySelectBox">카테고리</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select id="categorySelectBox">
                      <option value="">${productCategory}</option>
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
                    placeholder="${productManuf}"
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
                    placeholder="${productShortDes}"
                    autocomplete="on"
                  ></textarea>
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
                    placeholder="${productLongDes}"
                    autocomplete="on"
                  ></textarea>
                </div>
              </div>
  
              <div class="field is-fullwidth">
                <label class="label" for="imageInput">제품 사진</label>
                <div class="file has-name is-fullwidth">
                  <label class="file-label">
                    <input
                      class="file-input"
                      id="imageInput"
                      type="file"
                      name="image-file"
                      accept=".png, .jpeg, .jpg"
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
              </div>
  
              <div class="field">
                <label class="label" for="inventoryInput">재고</label>
                <div class="control">
                  <input
                    class="input"
                    id="inventoryInput"
                    type="number"
                    placeholder="10"
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
                      placeholder="${productPrice}"
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
                <button class="button is-primary is-fullwidth" id="submitButton">
                  수정
                </button>
              </div>
    `)
  } catch(err) {
    alert(`${err.message}`);
  }
}

//호출
delButton.addEventListener("click", deleteSubmit);
editButton.addEventListener("click", editSubmit);

await fetchProductDetail();