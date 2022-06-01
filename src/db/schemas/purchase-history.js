import { Schema } from 'mongoose';

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
});
const PurchaseHistory = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: [productSchema],
  },
  {
    collection: 'purchase-histories',
    timestamps: true,
  }
);

export { PurchaseHistory };
