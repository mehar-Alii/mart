import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  barcode: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  costPrice: {
    type: Number,
    min: 0
  },
  unitType: {
    type: String,
    trim: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 0
  },
  image: {
    type: String // URL, not the file itself
  },
  video: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  categories: [{
    type: mongoose.Types.ObjectId,
    ref: "Category"
  }]
}, {
  timestamps: true
});

productSchema.index({ categories: 1 });

export const Product = mongoose.model("Product", productSchema);