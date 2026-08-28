import { asyncHandler } from '../utils/asynchandler.js';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Product } from '../models/product.model.js';
import { addProductSchema } from '../validator/addProduct.validator.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const addProduct = asyncHandler(async (res, req) => {

  const result = addProductSchema.safeParse(req.body || {});

  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(", ");
    throw new ApiError(400, message);
  }

  const {
    name,
    brand,
    description,
    sku,
    barcode,
    price,
    comparePrice,
    costPrice,
    unitType,
    stockQuantity,
    lowStockThreshold
  } = result.data;

  // Prevent duplicate SKU (unique index will also catch this, but checking
  // first avoids an unhandled duplicate-key exception bubbling up)
  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    throw new ApiError(409, "A product with this SKU already exists");
  }

  const imageLocalPath = req.files?.image[0]?.path;

  if(!imageLocalPath){
    throw new ApiError(404, "please upload the image as well")
  }

  const image = await uploadOnCloudinary(imageLocalPath)

  if(!image){
    throw new ApiError(404, "please upload the image as well")
  }

  const product = await Product.create({
    name,
    brand,
    description,
    sku,
    barcode,
    price,
    comparePrice,
    costPrice,
    unitType,
    stockQuantity,
    lowStockThreshold,
    image : image.url,
    video : ""
  });

  console.log(product)

  if (!product) {
    throw new ApiError(500, "Something went wrong while adding the product");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

export { addProduct }