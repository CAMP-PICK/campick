import * as Api from '../api.js';

// querySelector로 변수 지정

const title = document.querySelector("#titleInput"); //제품명
const categorySelect = document.querySelector("#categorySelectBox"); //카테고리
const manufacturer = document.querySelector("#manufacturerInput"); //제조사
const shortDescription = document.querySelector("#shortDescriptionInput"); // 요약 설명
const detailDescription = document.querySelectordetail("#DescriptionInput"); // 상세 설명
const imagedata = document.querySelector("#imageInput"); // 제품 사진 임시
const inventory = document.querySelector("#inventoryInput"); // 제품 재고
const price = document.querySelector("#priceInput"); //제품 가격
  

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    submitButton.addEventListener('click', handleSubmit);
}
  
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
  
    async function handleSubmit(e) {
      e.preventDefault();
    
      const title = title.value; //제품명
      const categorySelect = categorySelect.value; //카테고리
      const manufacturer = manufacturer.value; //제조사
      const shortDescription = shortDescription.value; // 요약 설명
      const detailDescription = detailDescription.value; // 상세 설명
      const imagedata = imagedata.value; // 제품 사진 임시
      const inventory = inventory.value; // 제품 재고
      const price = price.value; //제품 가격

      try{
        const data = { title, categorySelect, manufacturer, shortDescription, detailDescription }
        await Api.post(`/api/product_sell/create`, data);
        alert(`정상 등록되었습니다.`);
        //선택한 카테고리 페이지로 이동
        window.location.href(`/${categorySelect}`);
      } catch(err) {
        alert(`${err.message}`);
      }
    }
  