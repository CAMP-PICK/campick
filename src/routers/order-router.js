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
            phoneNumber
        })

      res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
})

// 주문 전체 조회 api(url : /api/orderList/:email)
orderRouter.get('/list/:email', async (req, res, next) => {
  const email = req.params.email;
  try {
    const order = await orderService.getOrderList(email);

    res.status(200).json(order);
  } catch (error) {
      next(error);
  }
})

// 주문 상세 조회 api(url : /api/orderDetail/:id)
orderRouter.get('/detail/:id', async (req, res, next) => {

})

// 주문 수정 api(url : /api/setOrder/:id)
orderRouter.patch('/setOrder/:id', async (req, res, next) => {

})

// 주문 취소 api(url : /api/deleteOrder/:id)
orderRouter.delete('/delete/:id', async (req, res, next) => {

})

export { orderRouter };