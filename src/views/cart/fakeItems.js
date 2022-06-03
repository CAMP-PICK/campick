(function() {
  const _ITEMS = [{
    "_id": "6294ee96bc4683a377fb8646",
    "productName": "찢어진 텐트 팝니다!",
    "productPrice": 1000,
    "productCategory": "텐트",
    "productImage": "1654003166435_아기오구.jpg",
    "productManuf": "team1",
    "productShortDes": "낡은 텐트입니다.",
    "productLongDes": "낡고 찢어진 텐트입니다. 빈티지한 매력이 있습니다.",
    "productStock": 99,
    "createdAt": "2022-05-30T16:19:34.338Z",
    "updatedAt": "2022-06-01T13:11:58.843Z",
    "__v": 0,
    "quantity": 1
  },
  {
    "_id": "6294eef3bc4683a377fb8654",
    "productName": "거실형텐트",
    "productPrice": 1500000,
    "productCategory": "텐트",
    "productImage": "1653927667071_제목을 입력해주세요_-001.png",
    "productManuf": "team1",
    "productShortDes": "거실과 침실 공간이 분리된 투룸 텐트",
    "productLongDes": "매우 비싼 4인용 텐트입니다. 돈 많으면 사세요.",
    "productStock": 10,
    "createdAt": "2022-05-30T16:21:07.088Z",
    "updatedAt": "2022-05-30T16:21:07.088Z",
    "__v": 0,
    "quantity": 2
  },
  {
    "_id": "6294f08ea4bdc306354da6ad",
    "productName": "요술램프 지니",
    "productPrice": 100000000,
    "productCategory": "램프",
    "productImage": "1653928077993_제목을 입력해주세요_-001.png",
    "productManuf": "team1",
    "productShortDes": "소원을 들어드려요, 무려 100가지!",
    "productLongDes": "500년 뒤 소원을 100가지나 들어드리는 요술 램프 지니!",
    "productStock": 10,
    "createdAt": "2022-05-30T16:27:58.020Z",
    "updatedAt": "2022-05-30T16:27:58.020Z",
    "__v": 0,
    "quantity": 3
  },
  {
    "_id": "6295b295c2ce62c594a274ce",
    "productName": "호롤롤로 벌레 퇴치제 팝니다.",
    "productPrice": 9900,
    "productCategory": "기타",
    "productImage": "1653986883404_제목을 입력해주세요_-001.png",
    "productManuf": "할머니",
    "productShortDes": "하루살이를 한방에!",
    "productLongDes": "해만 떨어지면 이거이지 화안~하게 비치니까 이리 막 벌떼멘키로 날아와.[4] 역사랑게[5] 홀롤↗롤↗롤↗롤↗롤↗롤↗롤↗롤↗[6] 날아올라 막, (헤↗) 그라믄 손님들이 이 옷을 털고는 이 벌레가 묻을까봐 홀↗롤↗롤↗롤↗롤↗ 이러구 막 이러구...",
    "productStock": 10,
    "createdAt": "2022-05-31T06:15:49.620Z",
    "updatedAt": "2022-05-31T08:48:03.448Z",
    "__v": 0,
    "quantity": 1
  },
  {
    "_id": "6295b3f1c2ce62c594a274e4",
    "productName": "울어라, 지옥 참마도!",
    "productPrice": 39900,
    "productCategory": "기타",
    "productImage": "1653987246059_아기오구.jpg",
    "productManuf": "할머니",
    "productShortDes": "고기 손질을 한방에!",
    "productLongDes": "영감... 미안해요.. 다시는 안뽑기로 했는데...\r\n울어라, 지옥참마도!\r\n\r\n((내용 수정 테스트 중))",
    "productStock": 10,
    "createdAt": "2022-05-31T06:21:37.501Z",
    "updatedAt": "2022-05-31T08:54:06.077Z",
    "__v": 0,
    "quantity": 4
  },
  {
    "_id": "62979ae3ff38722f22416a38",
    "productName": "hellotest12131232",
    "productPrice": 18000,
    "productImage": "https://storage.googleapis.com/team1-buket/1654102755562",
    "productManuf": "elice",
    "productShortDes": "hi",
    "productLongDes": "hello",
    "productStock": 1,
    "createdAt": "2022-06-01T16:59:15.764Z",
    "updatedAt": "2022-06-01T16:59:15.764Z",
    "__v": 0,
    "quantity": 1
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