const state = {
  selectedAll: true,
  deliveryCost: 3000,
  items: [],
};

const $cache = {
  selectAll: document.querySelector(`.${cn.selectAll}`),
  btnDelSelected: document.querySelector(`.${cn.deleteSelected}`),
  items: document.querySelector(`.${cn.items}`),
  totalCost: document.querySelector(`.${cn.itemsTotal}`),
  deliveryCost: document.querySelector(`.${cn.deliveryCost}`),
  grandTotal: document.querySelector(`.${cn.grandTotal}`),
  btnBuy: document.querySelector(`.${cn.buy}`),
};

function setSelectedAll() {
  state.selectedAll = state.items
    .map(({ selected }) => selected)
    .every((isTrue) => isTrue);
}

function renderSelectAll() {
  const $0 = $cache.selectAll;
  $0.checked = state.selectedAll;
}

function renderItem({
  _id,
  productImage,
  productName,
  selected,
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
          <div class="column is-narrow">
            <input class="${genItemClassNames(
              cn.itemSelect,
              _id
            )}" ${genDatasetIdAttr(_id)} type="checkbox" ${
    selected ? 'checked' : ''
  }>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered is-multiline">
          <div class="column is-12">
          <strong>
            <span>총 가격&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span class="${genItemClassNames(
              cn.itemTotalPrice,
              _id
            )}" ${genDatasetIdAttr(_id)}>${numberWithCommas(
    productPrice * quantity
  )}</span></span></strong>
          </div>  
          <div class="column is-12"><strong>
            <span><i class="fa-solid fa-won-sign"></i>&nbsp<span class="${genItemClassNames(
              cn.itemPrice,
              _id
            )}" ${genDatasetIdAttr(_id)}>${numberWithCommas(
    productPrice
  )}</span></span></strong>
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
        <button  class="button is-ghost card-footer-item ${genItemClassNames(
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
  const items = state.items.map((item) => renderItem(item));
  $items.innerHTML = items.join('\n');
}

function getItemsTotalCost() {
  return state.items
    .filter(({ selected }) => selected)
    .reduce((acc, cur) => {
      const { productPrice, quantity } = cur;
      return acc + productPrice * quantity;
    }, 0);
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

function renderBtnBuy() {
  const $0 = $cache.btnBuy;
  $0.disabled = !state.items.filter(({ selected }) => selected).length;
}

function initItems() {
  const itemsJSONStr = localStorage.getItem(cartName);
  state.items = JSON.parse(itemsJSONStr).map((item) => ({
    ...item,
    selected: !!item.selected,
  }));
  setSelectedAll();
}

function render() {
  renderItems();
  renderItemsTotalCost();
  renderDeliveryCost();
  renderGrandTotalCost();
  renderSelectAll();
  renderBtnBuy();
}

function addEventListenerChkSelectAll() {
  const $0 = $cache.selectAll;
  $0.addEventListener('change', (e) => {
    state.items = state.items.map(({ selected, ...rest }) => ({
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
    state.items = state.items.filter(({ selected }) => !selected);
    localStorage.removeItem('shopping-cart');
    render();
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
      const index = state.items.findIndex(({ _id }) => id === _id);
      state.items[index]['selected'] = $target.checked;
      localStorage.setItem(cartName, JSON.stringify(state.items));
      setSelectedAll();
      render();
    }

    // 수량 인풋 change 이벤트 처리
    if ($target.classList.contains(cn.itemQuantity)) {
      const id = $target.dataset.id;
      const index = state.items.findIndex(({ _id }) => id === _id);
      let newValue = parseInt($target.value);
      if (newValue < 1) newVlaue = 1;
      if (newValue > state.items[index]['productStock'])
        newValue = state.items[index]['productStock'];
      state.items[index]['quantity'] = newValue;
      localStorage.setItem(cartName, JSON.stringify(state.items));
      render();
    }
  });

  // items 내에서의 모든 클릭 이벤트에 대한 처리
  $0.addEventListener('click', (e) => {
    const $target = e.target;

    // + 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.plusItem)) {
      const id = $target.dataset.id;
      const index = state.items.findIndex(({ _id }) => id === _id);
      let newValue = state.items[index]['quantity'] + 1;
      state.items[index]['quantity'] =
        newValue > state.items[index]['productStock']
          ? state.items[index]['productStock']
          : newValue;
      localStorage.setItem(cartName, JSON.stringify(state.items));
      render();
    }

    // - 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.minusItem)) {
      const id = $target.dataset.id;
      const index = state.items.findIndex(({ _id }) => id === _id);
      let newValue = state.items[index]['quantity'] - 1;
      state.items[index]['quantity'] = newValue < 1 ? 1 : newValue;
      localStorage.setItem(cartName, JSON.stringify(state.items));
      render();
    }

    // 삭제 버튼 클릭 이벤트 처리
    if ($target.classList.contains(cn.deleteItem)) {
      const id = $target.dataset.id;
      state.items = state.items.filter(({ _id }) => id !== _id);
      localStorage.setItem(cartName, JSON.stringify(state.items));
      render();
    }
  });
}

function addEventListenerBtnBuy() {
  const $0 = $cache.btnBuy;
  $0.addEventListener('click', (e) => {
    //비로그인시, 로그인 화면으로 전환
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
      return;
    }

    const itemsTotal = getItemsTotalCost();
    const deliveryCost = state.deliveryCost;
    const grandTotal = itemsTotal + deliveryCost;

    localStorage.setItem(
      'shopping-order',
      JSON.stringify({
        ...state,
        itemsTotal,
        grandTotal,
      })
    );

    // localStorage.removeItem(cartName);

    window.location.replace('/order');
  });
}

function bind() {
  addEventListenerChkSelectAll();
  addEventListenerDelSelected();
  addEventListenerItems();
  addEventListenerBtnBuy();
}

function init() {
  initItems();
  render();
  bind();
}

init();
