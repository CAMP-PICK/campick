import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
    async findAll() {
        const product = await Product.find({});
        return product;
    }
}
const productModel = new ProductModel();

export { productModel };
