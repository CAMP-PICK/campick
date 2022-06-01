(function() {
  const _ITEMS = [
    {
      "_id": "6278ad6f927a0d0520ff626a",
      "title": "남성 정장 ",
      "sellerId": "6273a8ecc61633555d33c37e",
      "categoryId": "6278acb0927a0d0520ff6260",
      "manufacturer": "스플래시",
      "shortDescription": "세련된 느낌의 정장입니다.",
      "detailDescription": "너무 두껍지 않고, 부담스럽지 않은 색상입니다.",
      "imageKey": "./mensuit.jpg",
      "inventory": 90,
      "price": 189000,
      "searchKeywords": ["남자옷", "정장", "남색", "세트"],
      "isRecommended": false,
      "discountPercent": 0,
      "createdAt": "2022-05-09T05:58:07.858Z",
      "updatedAt": "2022-05-09T05:58:07.858Z",
      "__v": 0,
      "quantity": 1,
      "selected": true,
    },
    {
      "_id": "6278adb9927a0d0520ff626d",
      "title": "여성 니트",
      "sellerId": "6273a8ecc61633555d33c37e",
      "categoryId": "6278acd0927a0d0520ff6263",
      "manufacturer": "스플래시",
      "shortDescription": "봄, 가을에 어울리는 니트입니다.",
      "detailDescription": "너무 부담스럽지 않은 색상의 니트입니다.",
      "imageKey": "./womenknit.jpg",
      "inventory": 200,
      "price": 24000,
      "searchKeywords": ["여성", "니트", "여자 니트", "따뜻", "시원"],
      "isRecommended": false,
      "discountPercent": 0,
      "createdAt": "2022-05-09T05:59:21.577Z",
      "updatedAt": "2022-05-09T05:59:21.577Z",
      "__v": 0,
      "quantity": 2,
      "selected": true,
    }
  ];

  // localStorage 카트 데이터(아이템)
  const itemsJSONstr = localStorage.getItem(cartName);

  // 카트 데이터가 이미 존재하면 리턴
  if (itemsJSONstr) {
    const items = JSON.parse(itemsJSONstr);
    if (items.length) return;
  };

  // 카트 데이터가 없으면 가짜 데이터 삽입
  localStorage.setItem(cartName, JSON.stringify(_ITEMS));
})();