// localStorage의 쇼핑 카트 아이템 키
const cartName = 'shopping-cart';


// DOM 컨트롤이 필요한 HTML element들의 class name 모음
const cn = {
  selectAll: 'chk-select-all',
  deleteSelected: 'btn-delete-selected',
  items: 'items',
  
  // class name prefix.
  // 아이템 엘리먼트내에서 클래스 이름과 클래스 이름의 접두어로 사용됨.
  // e.g. class="item-name item-name-3923948" (여기서 3923948은 아이템 고유 아이디)
  item: 'item',
  itemImg: 'item-img',
  itemName: 'item-name',
  itemSelect: 'item-chk-select',
  itemPrice: 'item-price',
  itemTotalPrice: 'item-total-price',
  itemQuantity: 'item-quantity',
  plusItem: 'btn-plus-item',
  minusItem: 'btn-minus-item',
  deleteItem: 'btn-rm-item',

  // footer
  itemsTotal: 'items-total-cost',
  deliveryCost: 'delivery-cost',
  grandTotal: 'grand-total-cost',
  buy: 'btn-buy',
};
