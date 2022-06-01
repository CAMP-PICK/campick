import { Router } from 'express';
import { productService } from '../services';
import { format } from 'util';
import Multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';
const { Storage } = require('@google-cloud/storage');
const productRouter = Router();
// env
import 'dotenv/config';

const storage = new Storage();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limit: {
    fileSize: 5 * 1024 * 1024, //5MB로 파일 사이즈 제한
  },
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + '_' + file.originalname);
  // },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

productRouter.post('/upload', multer.single('file'), (req, res, next) => {
  console.log(req.file);
  const fileName = Date.now();
  if (!req.file) {
    res.status(400).send('파일을 업로드 해주세요.');
    return;
  }

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(201).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// 상품등록 api
productRouter.post('/create', async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
    const productShortDes = req.body.productShortDes; //상품의 요약 설명 description을 Des로 줄임
    const productLongDes = req.body.productLongDes;
    const productStock = req.body.productStock; //상품 재고
    //이미지 파일 데이터 들어오는건 req.files 콘솔 찍어보면 됨
    const productImage = req.files[0].filename;

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
      productName,
      productPrice,
      productCategory,
      productImage,
      productManuf,
      productShortDes,
      productLongDes,
      productStock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//상품 전체목록 api
productRouter.get('/list', async (req, res, next) => {
  try {
    const totalProduct = await productService.productList();
    res.status(201).json(totalProduct);
  } catch (err) {
    next(err);
  }
});

//상품상세정보 api
productRouter.get('/list/:productName', async (req, res, next) => {
  try {
    const productName = req.params.productName;
    const findProduct = await productService.productInfo(productName);

    res.status(201).json(findProduct);
  } catch (err) {
    next(err);
  }
});

//상품 수정 api
productRouter.post('/edit/:editProduct', async (req, res, next) => {
  // req (request)의 body 에서 수정할 상품 데이터 가져오기
  const editProduct = req.params.editProduct;
  // 이미지 첨부가 안될 경우를 대비하여 상품의 기존 데이터 가져오기
  const findProduct = await productService.productInfo(editProduct);

  // req (request)의 body 에서 데이터 가져오기
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productCategory = req.body.productCategory;
  const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
  const productShortDes = req.body.productShortDes; //상품의 요약 설명 description을 Des로 줄임
  const productLongDes = req.body.productLongDes;
  const productStock = req.body.productStock;
  let productImage;

  if (req.files === undefined) {
    productImage = findProduct.productImage;
  }

  //update할 정보를 모아서 전달해주기 위해 새로운 객체변수 할당
  const updateInfo = {
    ...(productName && { productName }),
    ...(productPrice && { productPrice }),
    ...(productCategory && { productCategory }),
    ...(productManuf && { productManuf }),
    ...(productShortDes && { productShortDes }),
    ...(productLongDes && { productLongDes }),
    ...(productStock && { productStock }),
    ...(productImage && { productImage }),
  };

  const productInfoUpdate = await productService.editProduct(
    editProduct,
    updateInfo
  );

  res.status(200).json(productInfoUpdate);
});

//상품 삭제 api
productRouter.delete('/del/:productName', async (req, res, next) => {
  try {
    const productName = req.params.productName;
    const delProduct = await productService.deleteProduct(productName);

    res.status(201).json(delProduct);
  } catch (err) {
    next(err);
  }
});

export { productRouter };
