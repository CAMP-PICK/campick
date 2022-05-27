import { categoryModel } from '../db/models/category-model';

class CategoryService {

  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 카테고리 추가
  async addCategory(categoryInfo) {
    const {categoryName} = categoryInfo;
    //body에서 가져온 카테고리명으로 카테고리 중복 확인
    const category = await this.categoryModel.findByName(categoryName);
    //동일한 카테고리 존재 시 오류 발생
    if (category) {
      throw new Error("이미 등록된 카테고리입니다.");
    }
    //문제 없을 시 새로운 카테고리 생성
    const createNewCategory = await this.categoryModel.create(categoryInfo);
    
    return createNewCategory;
  }

  //카테고리 전체목록 조회
  async categoryList() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  //카테고리 수정
  async editCategory(categoryInfo) {
    const {categoryName} = categoryInfo;
    //body에서 가져온 카테고리명으로 카테고리 중복 확인
    const category = await this.categoryModel.findByName(categoryName);
    if (!category) {
      throw new Error("등록되지 않은 카테고리 입니다.")
    }
    const upeatedCategory = await this.categoryModel.update(categoryInfo);

    return upeatedCategory
  }

}

const categoryService = new CategoryService(categoryModel);

export { categoryService };