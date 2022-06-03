import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll(email) {
    const orders = await Order.find({ email: email });
    return orders;
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedUser = await Order.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(orderId) {
    const order = await Order.deleteOne({ _id: orderId });
    return order;
  }

  async deleteAll(email) {
    const order = await Order.deleteMany({ email: email });
    return order;
  }
}

const orderModel = new OrderModel();

export { orderModel };
