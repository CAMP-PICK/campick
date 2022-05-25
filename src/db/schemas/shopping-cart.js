import { Schema } from 'mongoose';

const productSchema = new Schema({productName:String})
const shoppingSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        product: [productSchema],
    },
    {
        collection: 'shopping-cart',
        timestamps: true,
    }
);

export { shoppingSchema };
