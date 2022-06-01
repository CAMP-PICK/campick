const state = {
  email: '',
  orderList: [],
};

function initState() {
  state.email = localStorage.getItem('email');
  state.orderList = getOrderList();
}

function getOrderList() {
  const email = state.email;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/order/list/${email}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('error', () => {
    alert('주문 목록 조회 실패. 잠시후 다시 시도해 주세요.');
  });
  xhr.addEventListener('load', (e) => {
    state.orderList = Array.from(xhr.response);
  });
  xhr.send();
};

function detailFormatter(idx, row) {
  console.log(row);
  return '<p>asdf</p>';
}

function renderTable() {
  $('#table').bootstrapTable({
    url: `/api/order/list/${state.email}`,
    pagination: true,
    //search: true,
    //toggle: 'table',
    detailView: true,
    detailViewByClick: true,
    detailViewIcon: false,
    detailFormatter: 'detailFormatter',
    uniqueId: '_id',
    columns: [{
      field: '_id',
      title: '주문번호',
    }, {
      field: 'state',
      title: '주문상태',
    }, {
      field: 'createdAt',
      title: '주문일시'
    }]
  });
}

function render() {
  renderTable();
}

function init() {
  initState();
  render();
}

init();