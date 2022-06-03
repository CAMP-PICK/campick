import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    orderList: [
      new Schema({
        productId: String,
        quantity: Number,
        price: Number,
      }),
    ],
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
      default: '주문 완료',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
