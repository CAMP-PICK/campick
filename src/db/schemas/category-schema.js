import { Schema } from 'mongoose';

const CategorySchema = new Schema (
  {
  categoryName: {
    type: String,
    required: false,
    default: "지정안함",
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  }
)

export {CategorySchema}
