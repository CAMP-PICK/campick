let state = {
  deliveryCost: 3000,
};

const $cache = {
  items: document.querySelector(`.${cn.items}`),
  totalCost: document.querySelector(`.${cn.itemsTotal}`),
  deliveryCost: document.querySelector(`.${cn.deliveryCost}`),
  grandTotal: document.querySelector(`.${cn.grandTotal}`),
  btnEdit: document.querySelector(`.${cn.edit}`),
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
  selectAll: document.querySelector(`.${cn.selectAll}`),
  btnDelSelected: document.querySelector(`.${cn.deleteSelected}`),
  state: document.getElementById(ids['orderState']),
};

function getItemsTotalCost() {
  return state.orderList.reduce((acc, cur) => {
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
  selected,
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
          <div class="column is-narrow">
            <input class="chk-select-all" type="checkbox" ${
              selected ? 'checked' : ''
            }>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered is-multiline">
          <div class="column is-12">
            <span><strong>총 가격 : <i class="fa-solid fa-won-sign"></i>&nbsp<span class="${genItemClassNames(
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
          <div class="column is-12"><input class="input ${genItemClassNames(
            cn.itemQuantity,
            _id
          )}" ${genDatasetIdAttr(_id)} type="number" min="1" max="${
    productStock ? productStock : 999
  }" value="${quantity}" ></div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-ghost card-footer-item ${genItemClassNames(
          cn.plusItem,
          _id
        )}" ${genDatasetIdAttr(_id)}>
          <span class="icon ${genItemClassNames(
            cn.plusItem,
            _id
          )}" ${genDatasetIdAttr(_id)}>
            <i class="fa-solid fa-plus ${genItemClassNames(
              cn.plusItem,
              _id
            )}" ${genDatasetIdAttr(_id)}></i>
            <span class="a11y-text-hidden">수량 1 증가</span>
          </span>
        </button>
        <button class="button is-ghost card-footer-item ${genItemClassNames(
          cn.minusItem,
          _id
        )}" ${genDatasetIdAttr(_id)}>
          <span class="icon ${genItemClassNames(
            cn.minusItem,
            _id
          )}" ${genDatasetIdAttr(_id)}>
            <i class="fa-solid fa-minus ${genItemClassNames(
              cn.minusItem,
              _id
            )}" ${genDatasetIdAttr(_id)}></i>
            <span class="a11y-text-hidden">수량 1 감소</span>
          </span>
        </button>
        <button class="button is-ghost card-footer-item ${genItemClassNames(
          cn.deleteItem,
          _id
        )}" ${genDatasetIdAttr(_id)}>
          <span class="icon ${genItemClassNames(
            cn.deleteItem,
            _id
          )}" ${genDatasetIdAttr(_id)}>
            <i class="fa-solid fa-trash-can ${genItemClassNames(
              cn.deleteItem,
              _id
            )}" ${genDatasetIdAttr(_id)}></i>
            <span class="a11y-text-hidden">상품 삭제</span>
          </span>
        </button>
      </footer>
    </div>
  </div>
  `;
}

function renderItems() {
  const $items = $cache.items;
  const items = state.orderList.map((item) => renderItem(item));
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
  renderSelectAll();
}

function getUserInfo() {
  $cache.recipient.value = state.fullName;
  $cache.email.value = state.email;
  const [phone1, phone2, phone3] = state.phoneNumber.split('-');
  $cache.phone1.value = phone1;
  $cache.phone2.value = phone2;
  $cache.phone3.value = phone3;
  const [pattern, zipCode] = /\((\d+)\)/.exec(state.address);
  $cache.zipCode.value = zipCode;
  $cache.addr1.value = state.address.replace(`${pattern} `, '');
}

function initState() {
  const orderJSONStr = localStorage.getItem(editName);
  state = {
    ...state,
    ...JSON.parse(orderJSONStr),
  };

  state.orderListTotal = state.totalPrice - state.deliveryCost;
  state.orderList = state.orderList.map((order) => ({
    ...order,
    selected: true,
  }));
  state.selectedAll = true;
  $cache.state.value = state.state;

  getUserInfo();
}

function addEventListenerBtnEdit() {
  const $0 = $cache.btnEdit;
  $0.addEventListener('click', () => {
    if (
      !$cache.zipCode.value ||
      !$cache.addr1.value ||
      // !$cache.addr2.value ||
      !state.totalPrice ||
      !state.orderList ||
      !$cache.recipient.value ||
      !$cache.email.value ||
      !$cache.phone1.value ||
      !$cache.phone2.value ||
      !$cache.phone3.value
    ) {
      alert('빈 값이 있습니다.');
      return;
    }

    if (state.orderList.length == 0) {
      const yes = confirm(
        '상품이 하나도 없습니다.\n이 경우 주문이 삭제 됩니다.\n계속 하시겠습니까?'
      );
      if (!yes) {
        window.location.reload();
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/api/order/delete`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('error', () => {
          alert('주문 삭제 실패. 잠시후 다시 시도해 주세요.');
        });
        xhr.addEventListener('load', () => {
          alert(`주문번호\n${state._id}\n삭제 성공`);
          localStorage.removeItem(editName);
          window.location.replace('/admin-order-list');
          return;
        });
        xhr.send(
          JSON.stringify({
            orderId: state._id,
          })
        );
      }
      return;
    } else {
      const httpRequest = new XMLHttpRequest();
      const body = {
        address: `(${$cache.zipCode.value}) ${$cache.addr1.value} ${$cache.addr2.value}`,
        totalPrice: state.totalPrice,
        orderList: state.orderList,
        recipient: $cache.recipient.value,
        email: $cache.email.value,
        phoneNumber: `${$cache.phone1.value}-${$cache.phone2.value}-${$cache.phone3.value}`,
        state: $cache.state.value,
      };
      httpRequest.open('PATCH', `/api/order/update/${state._id}`, true);
      httpRequest.setRequestHeader('Content-Type', 'application/json');
      httpRequest.addEventListener('error', () => {
        alert('주문 수정 실패. 잠시후 다시 시도해 주세요.');
      });
      httpRequest.addEventListener('load', () => {
        alert('주문 수정 성공. 주문 목록 페이지로 돌아갑니다...');
        localStorage.removeItem(editName);
        window.location.replace(`/admin-order-list`);
        return;
      });
      httpRequest.send(JSON.stringify(body));
    }
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

function addEventListenerItems() {
  const $0 = $cache.items;

  // items 내에서의 모든 change 이벤트에 대한 처리
  $0.addEventListener('change', (e) => {
    const $target = e.target;

    // 선택 체크박스 change 이벤트 처리
    if ($target.classList.contains(cn.itemSelect)) {
      const id = $target.dataset.id;
      const index = state.orderList.findIndex(({ _id }) => id === _id);
      state.orderList[index]['selected'] = $target.checked;
      setSelectedAll();
      render();
    }

    // 수량 인풋 change 이벤트 처리
    if ($target.classList.contains(cn.itemQuantity)) {
      const id = $target.dataset.id;
      const index = state.orderList.findIndex(({ _id }) => id === _id);
      let newValue = parseInt($target.value);
      if (newValue < 1) newVlaue = 1;
      if (newValue > state.orderList[index]['productStock'])
        newValue = state.orderList[index]['productStock'];
      state.orderList[index]['quantity'] = newValue;
      render();
    }
  });

  // items 내에서의 모든 클릭 이벤트에 대한 처리
  $0.addEventListener('click', (e) => {
    const $target = e.target;

    // + 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.plusItem)) {
      const id = $target.dataset.id;
      const index = state.orderList.findIndex(({ _id }) => id === _id);
      let newValue = state.orderList[index]['quantity'] + 1;
      state.orderList[index]['quantity'] =
        newValue > state.orderList[index]['productStock']
          ? state.orderList[index]['productStock']
          : newValue;
      render();
    }

    // - 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.minusItem)) {
      const id = $target.dataset.id;
      const index = state.orderList.findIndex(({ _id }) => id === _id);
      let newValue = state.orderList[index]['quantity'] - 1;
      state.orderList[index]['quantity'] = newValue < 1 ? 1 : newValue;
      render();
    }

    // 삭제 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.deleteItem)) {
      const id = $target.dataset.id;
      state.orderList = state.orderList.filter(({ _id }) => id !== _id);
      render();
    }
  });
}

function setSelectedAll() {
  state.selectedAll = state.orderList
    .map(({ selected }) => selected)
    .every((isTrue) => isTrue);
}

function addEventListenerChkSelectAll() {
  const $0 = $cache.selectAll;
  $0.addEventListener('change', (e) => {
    state.orderList = state.orderList.map(({ selected, ...rest }) => ({
      selected: e.target.checked,
      ...rest,
    }));
    setSelectedAll();
    render();
  });
}

function addEventListenerDelSelected() {
  const $0 = $cache.btnDelSelected;
  $0.addEventListener('click', (e) => {
    state.orderList = state.orderList.filter(({ selected }) => !selected);
    render();
  });
}

function renderSelectAll() {
  const $0 = $cache.selectAll;
  $0.checked = state.selectedAll;
}

function bind() {
  addEventListenerBtnEdit();
  addEventListenerBtnZip();
  addEventListenerChkSelectAll();
  addEventListenerDelSelected();
  addEventListenerItems();
}

function init() {
  initState();
  render();
  bind();
}

init();
