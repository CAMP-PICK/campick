import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
    async create(category) {
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

    async update({categoryId, update}) {
      const filter = {_id: categoryId};
      const updatedCategory = await Category.updateOne(filter, update)
      return updatedCategory
    }

    async delete(categoryName) {
      const category = await Category.deleteOne({categoryName: categoryName});
      return category;
    }
}
const categoryModel = new CategoryModel();

export { categoryModel };
