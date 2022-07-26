function init() {
  const $orderId = document.querySelector('.order-id');

  const search = location.search.substring(1);
  const {
    orderid
  } = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

  $orderId.innerHTML = ` ${orderid}`;
}

init();