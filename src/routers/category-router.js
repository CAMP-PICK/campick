import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { categoryService } from '../services';

const categoryRouter = Router();

//카테고리 추가 api
categoryRouter.post('/create', async (req, res, next)=>{
  try{
    const categoryName = req.body.categoryName
    const newCategory = await categoryService.addCategory({categoryName});

    res.status(201).json(newCategory);
  } catch(err) {
    next(err);
  }
})

export {categoryRouter}