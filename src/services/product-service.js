import { productModel } from '../db/models/product-model';

class ProductService {

    constructor(productModel) {
      this.productModel = productModel;
    }
  
    // 상품등록
    async addProduct(productInfo) {
      const {productName,
        productCategory,
        productManuf,
        productShortDes,
        productLongDes} = productInfo;
      
      const newProductInfo = {productName,
        productCategory,
        productManuf,
        productShortDes,
        productLongDes};
      
      const createNewProduct = await this.productModel.create(newProductInfo)
      
      return createNewProduct;
    
    }

    //상품수정
    async updateProduct(productInfo) {
      //상품 등록 여부 확인
      const product = await this.productModel.findByName(productInfo);
      if (!product || []) {
        throw new Error('해당 제품은 등록되지 않았습니다.');
      }
      return product;
    }

}

const productService = new ProductService(productModel);

export { productService };
