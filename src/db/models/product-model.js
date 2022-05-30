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
        const product = await Product.findOne({productName: productName});
        return product;
    }

    async findById(productId) {
        const product = await Product.findOne({_id: productId});
        return product;
    }

    async update({productId, update}) {
        const filter = {_id: productId};
        const updatedProduct = await Product.updateOne(filter, update);
        
        return updatedProduct;
    }

    async delete(productId) {
        const product = await Product.deleteOne({_id: productId});

        return product;
    }

    async findById(productId) {
        const product = await Product.findOne({_id: productId});
        return product;
    }
}
const productModel = new ProductModel();

export { productModel };
