import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from '../services';

const productRouter = Router();

// 상품등록 api
productRouter.post('/create', async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
    const productShortDes = req.body.productShortDes //상품의 요약 설명 description을 Des로 줄임
    const productLongDes = req.body.productLongDes
    //const productImage = //이미지를 req.body.productImage로 불러오면 문자열로 가져와지나?

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
        productName,
        productPrice,
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

//상품상세정보 api
productRouter.post('/list/:productName', async (req, res, next) => {
  try{
    const productName = req.params.productName;
    const findProduct = await productService.productInfo(productName)
    
    res.status(201).json(findProduct)
  } catch(err) {
    next(err);
  }
})

//상품 수정 api
productRouter.put('/edit/:editProduct', async (req, res, next) => {
  // req (request)의 body 에서 수정할 상품 데이터 가져오기
  const editProduct = req.params.editProduct;
  
  // req (request)의 body 에서 데이터 가져오기
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productCategory = req.body.productCategory;
  const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
  const productShortDes = req.body.productShortDes //상품의 요약 설명 description을 Des로 줄임
  const productLongDes = req.body.productLongDes
  
  //update할 정보를 모아서 전달해주기 위해 새로운 객체변수 할당
  const updateInfo = {
    ...(productName && {productName}),
    ...(productPrice && {productPrice}),
    ...(productCategory && {productCategory}),
    ...(productManuf && {productManuf}),
    ...(productShortDes && {productShortDes}),
    ...(productLongDes && {productLongDes}),
  };

  const productInfoUpdate = await productService.editProduct(editProduct, updateInfo);

  res.status(200).json(productInfoUpdate)
})

//상품 삭제 api
productRouter.delete('/del/:productName', async (req, res, next) => {
  try{
    const productName = req.params.productName;
    const delProduct = await productService.deleteProduct(productName);

    res.status(201).json(delProduct)
  } catch(err) {
    next(err);
  }
})


export { productRouter };

