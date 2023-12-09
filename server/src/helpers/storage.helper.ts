
import multer from 'multer';



export const profileImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file) {
      return cb(new Error('Dosya bulunamadı'), null);
    }
    cb(null, "/home/media/profile/")
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Geçersiz dosya türü'), null);
    }
    cb(null, Date.now() + "-pp-" + file.originalname)
  },
}
)

export const badgeImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file) {
      return cb(new Error('Dosya bulunamadı'), null);
    }
    cb(null, "/home/media/badge/")
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Geçersiz dosya türü'), null);
    }
    cb(null, Date.now() + "-badge-" + file.originalname)
  },
}
)

export const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file) {
      return cb(new Error('Dosya bulunamadı'), null);
    }
    cb(null, "/home/media/image/")
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Geçersiz dosya türü'), null);
    }
    cb(null, Date.now() + "-badge-" + file.originalname)
  },
}

)


