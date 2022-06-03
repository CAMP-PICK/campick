import { orderModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 추가
  async addOrder(orderInfo) {
    const createNewOrder = await this.orderModel.create(orderInfo);

    return createNewOrder;
  }

  // 주문 전체 조회
  async getOrderList(email) {
    const order = await this.orderModel.findAll(email);

    if (!order) {
      throw new Error('주문한 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return order;
  }

  // 주문 상세 조회
  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error('주문한 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return order;
  }

  // 주문 수정
  async updateOrder(orderId, updateInfo) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error('주문한 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const updateOrder = await this.orderModel.update({
      orderId,
      update: updateInfo,
    });

    return updateOrder;
  }

  // 주문 취소
  async deleteOrder(orderId) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error('주문한 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const deleteOrder = await this.orderModel.delete(orderId);

    return deleteOrder;
  }

  // 해당 이메일의 모든 주문 취소
  async deleteAll(email) {
    const deleteOrder = await this.orderModel.deleteAll(email);

    return deleteOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
