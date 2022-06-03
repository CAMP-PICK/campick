import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

// 주문 등록 api(url : /api/orderRegister)
orderRouter.post('/register', async (req, res, next) => {
  try {
    const address = req.body.address;
    const totalPrice = req.body.totalPrice;
    const orderList = req.body.orderList;
    const recipient = req.body.recipient;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const newOrder = await orderService.addOrder({
      address,
      totalPrice,
      orderList,
      recipient,
      email,
      phoneNumber,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 주문 전체 조회 api(url : /api/orderList/:email)
orderRouter.get('/list/:email', async (req, res, next) => {
  const email = req.params.email;
  try {
    const order = await orderService.getOrderList(email);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 주문 상세 조회 api(url : /api/orderDetail/:id)
orderRouter.get('/detail/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await orderService.getOrder(orderId);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 주문 수정 api(url : /api/setOrder/:id)
orderRouter.patch('/update/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const address = req.body.address;
    const totalPrice = req.body.totalPrice;
    const orderList = req.body.orderList;
    const recipient = req.body.recipient;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const state = req.body.state;

    const updateInfo = {
      ...(address && { address }),
      ...(totalPrice && { totalPrice }),
      ...(orderList && { orderList }),
      ...(recipient && { recipient }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
      ...(state && { state }),
    };
    const updatedOrderInfo = await orderService.updateOrder(
      orderId,
      updateInfo
    );
    res.status(200).json(updatedOrderInfo);
  } catch (error) {
    next(error);
  }
});

// 주문 취소 api(url : /api/order/delete)
orderRouter.post('/delete', async (req, res, next) => {
  const orderId = req.body.orderId;
  try {
    const order = await orderService.deleteOrder(orderId);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 해당 사용자의 모든 주문 취소
orderRouter.post('/alldelete', async function (req, res, next) {
  try {
    const email = req.body.email;
    const order = await orderService.deleteAll(email);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
