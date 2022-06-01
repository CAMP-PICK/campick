(function () {
  const _ITEMS = [
    {
      _id: '6294ee24bc4683a377fb863b',
      productName: '엄청 밝은 램프',
      productPrice: 49900,
      productCategory: '램프',
      productImage: 'https://bulma.io/images/placeholders/1280x960.png',
      productManuf: 'team1',
      productShortDes: '굉장히 눈 부신 램프',
      productLongDes:
        '예전 회사의 사수랑 캠핑을 간 적이 있습니다. 당시 캠핑장이 산 아래 있었는데 해가 빨리 떨어지기도 했고, 어둠도 너무나 순식간에 주위를 덮었습니다. 그때 사수가 준비한 랜턴을 꼈는데, 정말 엄청 밝더군요. 그때 처음으로 알게 되었어요. 랜턴이 얼마나 중요한 지 말이죠. 지금 소개드리는 랜턴 역시 어둠이 내려왔을 때 사용하기 좋은 제품입니다. 특히 광량이 3000 루멘으로 엄청 밝더라고요. 랜턴을 바로 보고 불을 켜면 눈이 아플 수 있으니 특히 조심하셔야 합니다.',
      createdAt: '2022-05-30T16:17:40.627Z',
      updatedAt: '2022-05-30T16:17:40.627Z',
      __v: 0,
      quantity: 1,
      productStock: 99,
    },
    {
      _id: '6294ee96bc4683a377fb8646',
      productName: '찢어진 텐트',
      productPrice: 1000,
      productCategory: '텐트',
      productImage: 'https://bulma.io/images/placeholders/1280x960.png',
      productManuf: 'team1',
      productShortDes: '낡은 텐트입니다.',
      productLongDes: '낡고 찢어진 텐트입니다. 빈티지한 매력이 있습니다.',
      createdAt: '2022-05-30T16:19:34.338Z',
      updatedAt: '2022-05-30T16:19:34.338Z',
      __v: 0,
      quantity: 2,
      productStock: 99,
    },
    {
      _id: '6294eec9bc4683a377fb864d',
      productName: '바베큐 폭립 오리지날',
      productPrice: 11100,
      productCategory: '기타',
      productImage: 'https://bulma.io/images/placeholders/1280x960.png',
      productManuf: 'vips',
      productShortDes:
        '부드럽고 촉촉한 살코기의 식감과 후추를 더해 질리지 않는 매력적인 소스가 있는 부드러운 돼지고기',
      productLongDes:
        '돼지고기라고는 믿기지 않는 부드럽고 촉촉한 살코기의 식감은 물론, 후추를 더해 입에 착 감기면서도 질리지 않는 소스도 무척 매력적입니다. 살코기가 두툼하게 붙은 돼지 등갈비에 특제 소스가 깊게 배어든 립이랍니다. 폭립을 완전히 조리한 뒤 냉동했기에 간단히 데우기만 해도 셰프의 손맛을 느낄 수 있어요. 달짝한 감칠맛의 오리지날 폭립으로 온 가족을 위한 상을 차려보세요.',
      createdAt: '2022-05-30T16:20:25.550Z',
      updatedAt: '2022-05-30T16:20:25.550Z',
      __v: 0,
      quantity: 3,
      productStock: 99,
    },
    {
      _id: '6294eef3bc4683a377fb8654',
      productName: '거실형텐트',
      productPrice: 1500000,
      productCategory: '텐트',
      productImage: 'https://bulma.io/images/placeholders/1280x960.png',
      productManuf: 'team1',
      productShortDes: '거실과 침실 공간이 분리된 투룸 텐트',
      productLongDes: '매우 비싼 4인용 텐트입니다. 돈 많으면 사세요.',
      createdAt: '2022-05-30T16:21:07.088Z',
      updatedAt: '2022-05-30T16:21:07.088Z',
      __v: 0,
      quantity: 4,
      productStock: 99,
    },
    {
      _id: '6294f08ea4bdc306354da6ad',
      productName: '요술램프 지니',
      productPrice: 100000000,
      productCategory: '램프',
      productImage: 'https://bulma.io/images/placeholders/1280x960.png',
      productManuf: 'team1',
      productShortDes: '소원을 들어드려요, 무려 100가지!',
      productLongDes: '500년 뒤 소원을 100가지나 들어드리는 요술 램프 지니!',
      createdAt: '2022-05-30T16:27:58.020Z',
      updatedAt: '2022-05-30T16:27:58.020Z',
      __v: 0,
      quantity: 5,
      productStock: 10,
    },
  ];

  // localStorage 카트 데이터(아이템)
  const itemsJSONstr = localStorage.getItem(cartName);

  // 카트 데이터가 이미 존재하면 리턴
  if (itemsJSONstr) {
    const items = JSON.parse(itemsJSONstr);
    if (items.length) return;
  }

  // 카트 데이터가 없으면 가짜 데이터 삽입
  localStorage.setItem(cartName, JSON.stringify(_ITEMS));
})();
