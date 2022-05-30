import { Router } from 'express';
import multer from 'multer';
import { imageController } from '../middlewares';

const imageRouter = Router();
const upload = multer({
  //업로드 된 파일은 uploads폴더에 저장한다.
  dest: 'uploads/'
})

imageRouter.post("/", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);

    console.log(req.files[0].path);
    res.json({ message: "Successfully uploaded files" });
}


export { imageRouter };