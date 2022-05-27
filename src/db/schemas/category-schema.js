import { Schema } from 'mongoose';

const CategorySchema = new Schema (
  {
  productCategory: {
    type: String,
    required: false,
    default: "지정안함",
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
)

export {CategorySchema}