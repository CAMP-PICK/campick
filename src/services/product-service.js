import { productModel } from '../db';

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
       
      console.log({
        productName,
        productCategory,
        productManuf,
        productShortDes,
        productLongDes
      });
    
    }
}

const productService = new ProductService(productModel);

export { productService };
