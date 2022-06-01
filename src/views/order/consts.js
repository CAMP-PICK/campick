// localStorage의 쇼핑 카트 아이템 키
const orderName = 'shopping-order';


// DOM 컨트롤이 필요한 HTML element들의 class name 모음
const cn = {
  items: 'items',
  btnZip: 'btn-search-zip-code',
  
  // class name prefix.
  // 아이템 엘리먼트내에서 클래스 이름과 클래스 이름의 접두어로 사용됨.
  // e.g. class="item-name item-name-3923948" (여기서 3923948은 아이템 고유 아이디)
  item: 'item',
  itemImg: 'item-img',
  itemName: 'item-name',
  itemPrice: 'item-price',
  itemTotalPrice: 'item-total-price',
  itemQuantity: 'item-quantity',

  // footer
  itemsTotal: 'items-total-cost',
  deliveryCost: 'delivery-cost',
  grandTotal: 'grand-total-cost',
  buy: 'btn-buy',
};

// DOM 컨트롤이 필요한 form element들의 id 모음
const ids = {
  orderForm: 'order-form',
  recipient: 'recipient',
  email: 'email',
  phone1: 'phone-1',
  phone2: 'phone-2',
  phone3: 'phone-3',
  zipCode: 'zip-code',
  addr1: 'address-1',
  addr2: 'address-2',
};
