import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { addProduct } from '../controllers/addProduct.controller.js';


const router = Router();

router.route("/add-product").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  addProduct
);

export default router