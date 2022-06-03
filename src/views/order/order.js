const state = {
  deliveryCost: 3000,
  grandTotal: 0,
  itemsTotal: 0,
  items: [],
};

const $cache = {
  items: document.querySelector(`.${cn.items}`),
  totalCost: document.querySelector(`.${cn.itemsTotal}`),
  deliveryCost: document.querySelector(`.${cn.deliveryCost}`),
  grandTotal: document.querySelector(`.${cn.grandTotal}`),
  btnBuy: document.querySelector(`.${cn.buy}`),
  btnZip: document.querySelector(`.${cn.btnZip}`),
  orderForm: document.getElementById(ids['orderForm']),
  recipient: document.getElementById(ids['recipient']),
  email: document.getElementById(ids['email']),
  phone1: document.getElementById(ids['phone1']),
  phone2: document.getElementById(ids['phone2']),
  phone3: document.getElementById(ids['phone3']),
  zipCode: document.getElementById(ids['zipCode']),
  addr1: document.getElementById(ids['addr1']),
  addr2: document.getElementById(ids['addr2']),
};

function getItemsTotalCost() {
  return state.items.reduce((acc, cur) => {
    const { productPrice, quantity } = cur;
    return acc + productPrice * quantity;
  }, 0);
}

function renderItem({
  _id,
  productImage,
  productName,
  productPrice,
  quantity,
  productStock,
}) {
  return `
  <div class="column is-3 ${genItemClassNames(
    cn.item,
    _id
  )}" ${genDatasetIdAttr(_id)}>
    <div class="card">
      <div class="card-image">
        <a href="/product_detail/?name=${productName}">
          <figure class="image is-1by1">
            <img class="${genItemClassNames(
              cn.itemImg,
              _id
            )}" ${genDatasetIdAttr(_id)} src="${
    productImage.startsWith('http') ? productImage : `/uploads/${productImage}`
  }" alt="${productName}">
          </figure>
        </a>
      </div>
      <div class="card-content">
        <div class="columns is-mobile is-vcentered is-1">
          <div class="column">
            <h3 class="title is-5"><a href="/product_detail/?name=${productName}"><span class="${genItemClassNames(
    cn.itemName,
    _id
  )}" ${genDatasetIdAttr(_id)}>${productName}<span></a></h3>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered is-multiline">
          <div class="column is-12">
            <span><strong>총 가격&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span class="${genItemClassNames(
              cn.itemTotalPrice,
              _id
            )}" ${genDatasetIdAttr(_id)}>${numberWithCommas(
    productPrice * quantity
  )}</span></strong></span>
          </div>
          <div class="column is-12">
            <span><strong><i class="fa-solid fa-won-sign"></i>&nbsp<span class="${genItemClassNames(
              cn.itemPrice,
              _id
            )}" ${genDatasetIdAttr(_id)}>${numberWithCommas(
    productPrice
  )}</span></strong></span>
          </div>
          <div class="column is-12"><input disabled class="input ${genItemClassNames(
            cn.itemQuantity,
            _id
          )}" ${genDatasetIdAttr(_id)} type="number" min="1" max="${
    productStock ? productStock : 999
  }" value="${quantity}" ></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderItems() {
  const $items = $cache.items;
  const items = state.items.map((item) => renderItem(item));
  $items.innerHTML = items.join('\n');
}

function renderItemsTotalCost() {
  const $0 = $cache.totalCost;
  const cost = getItemsTotalCost();
  $0.innerHTML = numberWithCommas(cost);
}

function renderDeliveryCost() {
  const $0 = $cache.deliveryCost;
  $0.innerHTML = numberWithCommas(state.deliveryCost);
}

function renderGrandTotalCost() {
  const $0 = $cache.grandTotal;
  $0.innerHTML = numberWithCommas(getItemsTotalCost() + state.deliveryCost);
}

function render() {
  renderItems();
  renderItemsTotalCost();
  renderDeliveryCost();
  renderGrandTotalCost();
}

function getUserInfo(email) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', `/api/user/email/${email}`, true);
  httpRequest.addEventListener('error', () => {
    console.log('유저 정보 가져오기 실패.');
  });
  httpRequest.addEventListener('load', (e) => {
    const { fullName, phoneNumber, address } = JSON.parse(httpRequest.response);
    $cache.recipient.value = fullName;
    $cache.email.value = email;
    $cache.zipCode.value = address.address3;
    $cache.addr1.value = address.address1;
    $cache.addr2.value = address.address2;
    if (phoneNumber) {
      let phoneArr = new Array(3);
      if (phoneNumber.length > 10) {
        phoneArr[0] = phoneNumber.substr(0, 3);
        phoneArr[1] = phoneNumber.substr(3, 4);
        phoneArr[2] = phoneNumber.substr(7, 4);
      } else {
        phoneArr[0] = phoneNumber.substr(0, 3);
        phoneArr[1] = phoneNumber.substr(3, 3);
        phoneArr[2] = phoneNumber.substr(6, 4);
      }
      $cache.phone1.value = phoneArr[0];
      $cache.phone2.value = phoneArr[1];
      $cache.phone3.value = phoneArr[2];
    }
  });
  httpRequest.send();
}

function initState() {
  const orderJSONStr = localStorage.getItem(orderName);
  const email = localStorage.getItem('email');
  getUserInfo(email);

  const { deliveryCost, grandTotal, itemsTotal, items } =
    JSON.parse(orderJSONStr);

  state.deliveryCost = deliveryCost;
  state.grandTotal = grandTotal;
  state.itemsTotal = itemsTotal;
  state.items = items.map(({ selected, ...rest }) => rest);
}

function addEventListenerBtnBuy() {
  const $0 = $cache.btnBuy;
  $0.addEventListener('click', () => {
    if (
      !$cache.zipCode.value ||
      !$cache.addr1.value ||
      !$cache.addr2.value ||
      !state.grandTotal ||
      !state.items ||
      !$cache.recipient.value ||
      !$cache.email.value ||
      !$cache.phone1.value ||
      !$cache.phone2.value ||
      !$cache.phone3.value
    ) {
      alert('빈 값이 있습니다.');
      return;
    }

    const httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/api/order/register', true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.addEventListener('error', () => {
      alert('결제 실패. 잠시후 다시 시도해 주세요.');
    });
    httpRequest.addEventListener('load', (e) => {
      localStorage.removeItem(orderName);
      window.location.replace(
        `/order-finish/?orderid=${JSON.parse(httpRequest.response)['_id']}`
      );
    });
    httpRequest.send(
      JSON.stringify({
        address: `(${$cache.zipCode.value}) ${$cache.addr1.value} ${$cache.addr2.value}`,
        totalPrice: state.grandTotal,
        orderList: state.items,
        recipient: $cache.recipient.value,
        email: $cache.email.value,
        phoneNumber: `${$cache.phone1.value}-${$cache.phone2.value}-${$cache.phone3.value}`,
      })
    );
  });
}

function addEventListenerBtnZip() {
  const $0 = $cache.btnZip;
  $0.addEventListener('click', (e) => {
    e.preventDefault();
    new daum.Postcode({
      oncomplete: function (data) {
        $cache.zipCode.value = data['zonecode'];
        $cache.addr1.value = data['roadAddress'];
      },
    }).open();
  });
}

function bind() {
  addEventListenerBtnBuy();
  addEventListenerBtnZip();
}

function init() {
  initState();
  render();
  bind();
}

init();
