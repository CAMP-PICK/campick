import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { categoryService } from '../services';

const categoryRouter = Router();

//카테고리 추가 api
categoryRouter.post('/create', async (req, res, next)=>{
  try{
    //body에서 카테고리명 가져오기
    const categoryName = req.body.categoryName
    //새로운 카테고리 데이터베이스 생성
    const newCategory = await categoryService.addCategory({categoryName});

    res.status(201).json(newCategory);
  } catch(err) {
    next(err);
  }
})

//카테고리 조회 api
categoryRouter.get('/list', async(req, res, next) =>{
  try{
    //전체 카테고리 목록 불러오기
    const categories = await categoryService.categoryList();
    //만약 categoryName만 따로 배열로 받고싶다면 이 부분 코드 주석을 해제하고 //아래 부분을 주석처리하세요.
    // const categoryNames = [];
    // categories.forEach(category => {
    //   categoryNames.push(category.categoryName);
    // });
    // res.status(201).json(categoryNames);
    
    //findAll함수는 배열형태로 정보를 가져오기 때문에 데이터 이용할 때 주의해야함
    res.status(201).json(categories); //이부분을 주석처리 해주세요.
  } catch(err) {
    next(err);
  }
})

//카테고리 수정 api
categoryRouter.post('/edit/:categoryName', async (req, res, next) => {
  //수정할카테고리 받아오기
  const editCategoryName = req.params.categoryName;
  //수정할 이름 받기
  const categoryName = req.body.categoryName;

  //업데이트를 하기 위한 객체 변수 할당(객체 구조로 받기 위해 구조분해할당 사용)
  const updateInfo = {
    ...(categoryName && { categoryName }),
  };

  const categoryNameUpdate = await categoryService.editCategory(editCategoryName, updateInfo);

  res.status(201).json(categoryNameUpdate);
})

//카테고리 삭제 api
categoryRouter.delete('/del/:categoryName', async(req, res, next)=>{
  //삭제 할 카테고리 받아오기
  const categoryName = req.params.categoryName;
  const deleteCategory = await categoryService.deleteCategory(categoryName);

  res.status(201).json(deleteCategory)
})

export {categoryRouter}