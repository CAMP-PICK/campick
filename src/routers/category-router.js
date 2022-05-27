import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService, categoryService } from '../services';

const categoryRouter = Router();

//카테고리 추가 api
categoryRouter.post('/category', async (req, res, next)=>{
  const body = req.body.body;
  await res.send(body);
})

export {categoryRouter}