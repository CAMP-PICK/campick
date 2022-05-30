import { Router } from 'express';
import multer from 'multer';

const imageRouter = Router();

const storage = multer.diskStorage({
  //이미지 파일이 저장 될 곳 지정
  destination: function(req, files, cb) {
    cb(null, 'uploads/')
  },
  //이미지 이름 지정 (생성일자 타임스탬프+실제 파일이름)
  filename: function(req, files, cb) {
    cb(null, Date.now() + '_' + files.originalname);
  }
})
const upload = multer({
  storage: storage,
  fileFilter: function(req, files, cb) {
    //이미지 확장자가 jpg, png, jpge가 아니면 오류발생
    let typeArray = files.mimetype.split('/');
    let fileType = typeArray[1];
    if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {
      cb(null, true);
    } else {
      req.fileValidationError = "jpg,jpeg,png 파일만 업로드 가능합니다.";
      cb(null, false);
    }
  }
})

imageRouter.post("/", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);

    console.log(req.files[0].path);
    res.json({ message: "Successfully uploaded files" });
}


export { imageRouter };