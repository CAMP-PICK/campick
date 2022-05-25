import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from '../services';
import { ProductSchema } from '../db/schemas/product-schema';

const productRouter = Router();

// //테스트 api
// productRouter.get('/', async (req, res, next) => {
//   console.log(req.body);
//   res.send('전송완료')
// })

// 상품등록 api
productRouter.post('/create', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const productName = req.body.productName;
    const productCategory = req.body.productCategory;
    const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
    const productShortDes = req.body.productShortDes //상품의 요약 설명 description을 Des로 줄임
    const productLongDes = req.body.productLongDes
    //const productImage = //이미지를 req.body.productImage로 불러오면 문자열로 가져와지나?

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
        productName,
        productCategory,
        productManuf,
        productShortDes,
        productLongDes,
    });
    res.status(201).json(newProduct)

  } catch(error) {
      next(error);
  }


});

//상품상세 api
productRouter.post('/list/:productName', async (req, res, next) => {
  const productName = req.params.productName;
  const findProduct = await productService.updateProduct(productName)
  
  res.json(findProduct)  
})


export { productRouter };
