import { Router } from 'express';
import { productService } from '../services';
import { format } from 'util';
import Multer from 'multer';
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
});

//구글 클라우드 스토리지의 저장소 = 버킷
const bucket = storage.bucket(process.env.GCS_BUCKET);

// 상품등록 api
productRouter.post('/create', multer.single('file'), async (req, res, next) => {
  try {
    //저장될 파일 이름 정하기
    const fileName = Date.now();

    //만약 파일 업로드를 하지 않고 제출을 눌렀다면
    if (!req.file) {
      res.status(400).send('파일을 업로드 해주세요.');
      return;
    }

    //버킷에 이미지가 저장될 때 이미지 명 설정
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      //클라우드로 저장되는 파일의 확장자가 업로드 되는 확장자가 될 수 있도록 타입 지정
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    //이미지를 업로드 하는 중 오류가 발생했다면
    blobStream.on('error', (err) => {
      next(err);
    });

    //이미지 업로드가 완료되고 나서 어떤 동작 할건지
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    blobStream.end(req.file.buffer);

    // req (request)의 body 에서 데이터 가져오기
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productManuf = req.body.productManuf; //상품의 제조사 product manufacturing company 줄임말
    const productShortDes = req.body.productShortDes; //상품의 요약 설명 description을 Des로 줄임
    const productLongDes = req.body.productLongDes;
    const productStock = req.body.productStock; //상품 재고
    const productImage = publicUrl;

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
productRouter.post(
  '/edit/:editProduct',
  multer.single('file'),
  async (req, res, next) => {
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

    //만약 저장된 이미지를 그대로 사용한다면
    if (!req.file) {
      productImage = findProduct.productImage;
    } else {
      //이미지를 변경한다면 이미지 파일 재업로드
      //저장될 파일 이름 정하기
      const fileName = Date.now();

      //버킷에 이미지가 저장될 때 이미지 명 설정
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        //클라우드로 저장되는 파일의 확장자가 업로드 되는 확장자가 될 수 있도록 타입 지정
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      //이미지를 업로드 하는 중 오류가 발생했다면
      blobStream.on('error', (err) => {
        next(err);
      });

      //이미지 업로드가 완료되고 나서 어떤 동작 할건지
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      blobStream.end(req.file.buffer);
      productImage = publicUrl;
      console.log(publicUrl);
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

    console.log(productInfoUpdate);

    res.status(200).json(productInfoUpdate);
  }
);

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
