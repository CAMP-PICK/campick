import { categoryModel } from '../db/models/category-model';

class CategoryService {

  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 카테고리 추가
  async addCategory(categoryInfo) {
    const {categoryName} = categoryInfo
    //카테고리 중복 확인
    const category = await this.categoryModel.findByName(categoryName);
    if (category) {
      throw new Error("이미 등록된 카테고리입니다.");
    }
    const createNewCategory = await this.categoryModel.create(categoryInfo);
    
    return createNewCategory;
  }

}

const categoryService = new CategoryService(categoryModel);

export { categoryService };