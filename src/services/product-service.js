import { productModel } from '../db/models/product-model';

class ProductService {

    constructor(productModel) {
      this.productModel = productModel;
    }
  
    // 상품등록
    async addProduct(productInfo) {
      const {productName} = productInfo;
      const createNewProduct = await this.productModel.create(productInfo);
      if (createNewProduct.productName === productName) {
        throw new Error("이미 등록된 상품명입니다.");
      }
      
      return createNewProduct;
    }

    //상품상세정보
    async productInfo(productName) {
      //상품 등록 여부 확인
      const product = await this.productModel.findByName(productName);
      if (!product) {
        throw new Error('해당 제품은 등록되지 않았습니다.');
      }
      return product;
    }
    
    // //상품 수정
    // async editProduct(productName) {
    //   const product = await this.productModel.findByName(productName);
    //   //const productId = await this.productModel.findById(product._id);

      
    // }

}

const productService = new ProductService(productModel);

export { productService };