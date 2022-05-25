import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
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
  },
  {
    //collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };