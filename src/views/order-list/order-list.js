const state = {
  email: '',
  orderList: [],
  productLib: [],
};

async function initState() {
  state.email = localStorage.getItem('email');
  state.orderList = await getOrderList();
  state.productLib = await getProductLib();
  state.orderList = state.orderList.map(({ orderList, ...rest }) => {
    return {
      ...rest,
      orderList: orderList
        .map(({ _id, ...rest }) => {
          return {
            ...rest,
            ...state.productLib.find(({ _id: productId }) => _id == productId),
          };
        })
        .filter(({ _id }) => _id),
    };
  });
}

function getOrderList() {
  return new Promise((resolve, reject) => {
    const email = state.email;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/order/list/${email}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('error', () => {
      alert('주문 목록 조회 실패. 잠시후 다시 시도해 주세요.');
      reject();
    });
    xhr.addEventListener('load', () => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.send();
  });
}

function getProductLib() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/product/list`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('error', () => {
      alert('상품 목록 조회 실패. 잠시후 다시 시도해 주세요.');
      reject();
    });
    xhr.addEventListener('load', (e) => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.send();
  });
}

function renderItem({ productImage, productName, productPrice, quantity }) {
  return `
  <div class="column is-3" style="font-family: 'Noto Sans KR', sans-serif">
    <div class="card">
      <div class="card-image">
        <a href="/product_detail/?name=${productName}">
          <figure class="image is-1by1">
            <img src="${
              productImage.startsWith('http')
                ? productImage
                : `/uploads/${productImage}`
            }" alt="${productName}">
          </figure>
        </a>
      </div>
      <div class="card-content">
        <div class="columns is-mobile is-vcentered is-1">
          <div class="column">
            <h3 class="title is-5"><a href="/product_detail/?name=${productName}"><span>${productName}<span></a></h3>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered is-multiline">
          <div class="column is-12">
            <span><strong>총 가격&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span>${numberWithCommas(
              productPrice * quantity
            )}</span></strong></span>
          </div>
          <div class="column is-12">
            <span><strong><i class="fa-solid fa-won-sign"></i>&nbsp<span>${numberWithCommas(
              productPrice
            )}</span></strong></span>
          </div>
          <div class="column is-12"><strong>${quantity}개</strong></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function cancelOrder(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/api/order/delete`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('error', () => {
    alert('주문 취소 실패. 잠시후 다시 시도해 주세요.');
  });
  xhr.addEventListener('load', () => {
    console.log(JSON.parse(xhr.response));
    alert(`주문번호\n${id}\n취소 성공`);
    window.location.reload();
  });
  xhr.send(
    JSON.stringify({
      orderId: id,
    })
  );
}

function detailFormatter(
  idx,
  { address, email, orderList, phoneNumber, recipient, totalPrice, _id }
) {
  return `
    <div class="box" style="font-family: 'Noto Sans KR', sans-serif">
      <div class="columns is-vcentered pay-info">
        <div class="column is-1">${recipient}</div>
        <div class="column is-5">${address}</div>
        <div class="column is-3">${email}</div>
        <div class="column is-3">${phoneNumber}</div>
      </div>
    </div>
    <div class="box" style="font-family: 'Noto Sans KR', sans-serif">
      <div class="columns is-vcentered pay-info">
        <div class="column is-4"><strong>상품 합계&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span class="items-total-cost">${numberWithCommas(
          totalPrice - 3000
        )}</span></strong></div>
        <div class="column is-4"><strong>배송비&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span class="delivery-cost">${numberWithCommas(
          3000
        )}</span></strong></div>
        <div class="column is-4"><strong>총 합계&nbsp:&nbsp<i class="fa-solid fa-won-sign"></i>&nbsp<span class="grand-total-cost">${numberWithCommas(
          totalPrice
        )}</span></strong></div>
      </div>
    </div>
    <div class="box item-list" style="font-family: 'Noto Sans KR', sans-serif">
      <div class="columns items is-multiline">
        ${orderList.map(renderItem).join('\n')}
      </div>
    </div>
  `;
}

function createdDateFormatter(value) {
  const date = new Date(value);
  let dayKor;
  switch (date.getDay()) {
    case 0:
      dayKor = '일';
      break;
    case 1:
      dayKor = '월';
      break;
    case 2:
      dayKor = '화';
      break;
    case 3:
      dayKor = '수';
      break;
    case 4:
      dayKor = '목';
      break;
    case 5:
      dayKor = '금';
      break;
    case 6:
      dayKor = '토';
      break;
  }

  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${dayKor}요일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
}

function renderTable() {
  $('#table').bootstrapTable({
    data: state.orderList,
    pagination: true,
    detailView: true,
    detailViewByClick: true,
    detailViewIcon: false,
    detailFormatter: 'detailFormatter',
    uniqueId: '_id',
    columns: [
      {
        field: '_id',
        title: '주문번호',
      },
      {
        field: 'state',
        title: '주문상태',
      },
      {
        field: 'createdAt',
        title: '주문일시',
        formatter: createdDateFormatter,
      },
      {
        field: 'updatedAt',
        title: '수정일시',
        formatter: createdDateFormatter,
      },
    ],
  });
}

function render() {
  renderTable();
}

async function init() {
  await initState();
  render();
}

init();
