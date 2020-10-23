import e from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (
    req: e.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ): void => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
