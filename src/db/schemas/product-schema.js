import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: String,
      required: false,
    },
    productImage: {
      type: String,
      required: false,
    },
    productManuf: {
      type: String,
      required: true,
    },
    productShortDes: {
      type: String,
      required: true,
    },
    productLongDes: {
      type: String,
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
