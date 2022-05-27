import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
    async create(category) {
      console.log(category)
      const createNewCategory = await Category.create(category);
      return createNewCategory;
    }
    
    async findAll() {
      const categories = await Category.find({});
      return categories;
    }

    async findByName(categoryName) {
      const category = await Category.findOne({categoryName: categoryName})
      return category;
    }

    // async update({}) {
    //   const category = await Category.findOne({categoryName: categoryName})
    // }
}
const categoryModel = new CategoryModel();

export { categoryModel };