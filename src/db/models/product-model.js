import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
    async create(productInfo) {
        const createNewProduct = await Product.create(productInfo);
        return createNewProduct;
    }
    
    async findAll() {
        const product = await Product.find({});
        return product;
    }

    async findByName(productName) {
        const product = await Product.find({productName: productName});
        return product;
    }
}
const productModel = new ProductModel();

export { productModel };
