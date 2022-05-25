//indexedDB에서 상품정보 읽어오기
//상품정보가지고 리스트아이템 랜더링
//플,마,삭제 이벤트 리스너
//이벤트 리스너 -,+,삭제

const _DATA = [
  {
    "_id":"6278ad6f927a0d0520ff626a",
    "title":"남성 정장 ",
    "sellerId":"6273a8ecc61633555d33c37e",
    "categoryId":"6278acb0927a0d0520ff6260",
    "manufacturer":"스플래시",
    "shortDescription":"세련된 느낌의 정장입니다.",
    "detailDescription":"너무 두껍지 않고, 부담스럽지 않은 색상입니다.",
    "imageKey":"Men%20Clothes/34qnr_mc-1.jpg",
    "inventory":90,
    "price":189000,
    "searchKeywords":["남자옷","정장","남색","세트"],
    "isRecommended":false,
    "discountPercent":0,
    "createdAt":"2022-05-09T05:58:07.858Z",
    "updatedAt":"2022-05-09T05:58:07.858Z",
    "__v":0,
    "quantity":1
  },
{"_id":"6278adb9927a0d0520ff626d","title":"여성 니트","sellerId":"6273a8ecc61633555d33c37e","categoryId":"6278acd0927a0d0520ff6263","manufacturer":"스플래시","shortDescription":"봄, 가을에 어울리는 니트입니다.","detailDescription":"너무 부담스럽지 않은 색상의 니트입니다.","imageKey":"Women%20Clothes/5u446_wc-1.jpg","inventory":200,"price":24000,"searchKeywords":["여성","니트","여자 니트","따뜻","시원"],"isRecommended":false,"discountPercent":0,"createdAt":"2022-05-09T05:59:21.577Z","updatedAt":"2022-05-09T05:59:21.577Z","__v":0,"quantity":2}];

let db;

const getDB = (dbName, dbVersion, storeName, fn) => {
  const req = indexedDB.open(dbName, dbVersion);

  req.onsuccess = function (evt) { db = this.result; fn(); };

  req.onerror = function (evt) { console.error('indexedDB 생성 오류'); };

  req.onupgradeneeded = function (evt) {
    console.log('indexedDB upgradeneeded');
    const store = evt.currentTarget.result.createObjectStore(storeName, {
      keyPath: 'id', autoIncrement: true
    });
  };
};

const getObjectStore = (storeName, mode) => {
  return db.transaction(storeName, mode).objectStore(storeName);
};

const addObjectToStore = (storeName, obj) => {
  const store = getObjectStore(storeName, 'readwrite');
  let req = store.add(obj);  ;

  req.onerror = function (evt) {
    console.error('indexedDB store add error', evt);
  };
};

(function() {
  
  // _DATA를 indexedDB에 저장한다.
  getDB('shopping', 1, 'cart', () => {
    _DATA.forEach((d) => {
      addObjectToStore('cart', d);
    });
  });

  // indexedDB에서 데이터를 읽어온다.
  let items = [];
  getDB('shopping', 1, 'cart', () => {
    const store = getObjectStore('cart', 'readonly');
    const storeReq = store.openCursor();
    storeReq.onsuccess = function (evt) {
      const cursor = evt.target.result;
      if (cursor) {
        const req = store.get(cursor.key);
        req.onsuccess = function (evt) {
          const value = evt.target.result;
          items.push(value);
        };
        const $items = document.querySelector('.items');
        const itemsTemplateArr = items.map((item) => {
          const title = item['title'];
          const imgKey = item['imageKey'];
          const price = item['price'];
          const quantity = item['quantity'];
          const total = price * quantity;

          const itemTemplate = `
          <div class="item">
            <input type="checkbox">
            <a href="#"><img src="${imgKey}"></a>
            <a href="#">${title}</a>
            <div class="cost"><span>${price}</span>원</div>
            <button type="button">-</button>
            <div class="quantity"><input type="number" min="1" value="${quantity}"></div>
            <button type="button">+</button>
            <div class="total-cost"><span>${total}</span>원</div>
            <button type="button">삭제</button>
          </div>
          `;

          return itemTemplate;
        });

        $items.innerHTML = itemsTemplateArr.join('\n');
        cursor.continue();
      }
    };

  });

  // 읽어온 데이터로 아이템 리스트를 렌더링한다.

  
})();