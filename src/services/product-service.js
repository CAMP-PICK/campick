import { productModel } from '../db/models/product-model';

class ProductService {

  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품등록
  async addProduct(productInfo) {
    const { productName } = productInfo;

    //상품 중복 확인
    const product = await this.productModel.findByName(productName);
    if (product) {
      throw new Error("이미 등록된 상품명입니다.");
    }
    const createNewProduct = await this.productModel.create(productInfo);


    return createNewProduct;
  }

  //상품 전체목록
  async productList() {
    const totalProduct = await this.productModel.findAll();
    if (!totalProduct) {
      throw new Error("등록된 상품이 없습니다.");
    }

    return totalProduct;
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

  //상품 수정
  async editProduct(editProduct, updateInfo) {
    //수정할 상품이 있는지 확인, 만약 존재하지 않는다면 에러 발생
    let product = await this.productModel.findByName(editProduct);
    if (!product) {
      throw new Error('존재하지 않는 상품입니다.');
    }
    //상품의 _id값 추출
    const productId = product._id;

    //상품의 _id값과 변경 사항을 담아 update하여 수정 된 데이터를 product에 담음
    product = await this.productModel.update({
      productId,
      update: updateInfo,
    })

    //수정된 상품 정보 반환
    return product;
  }

  //상품 삭제
  async deleteProduct(productName) {
    const product = await this.productModel.findByName(productName);
    if (!product) {
      throw new Error("존재하지 않는 상품입니다.")
    }
    const deleteProduct = await this.productModel.delete(product._id);

    return deleteProduct;
  }

}

const productService = new ProductService(productModel);

export { productService };
