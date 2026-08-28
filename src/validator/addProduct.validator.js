import { z } from "zod";
import mongoose from "mongoose";


const addProductSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .trim()
    .min(1, "Product name is required"),

  brand: z.string().trim().optional().or(z.literal("")),

  description: z.string().optional().or(z.literal("")),

  sku: z
    .string({ required_error: "SKU is required" })
    .trim()
    .min(1, "SKU is required"),

  barcode: z.string().trim().optional().or(z.literal("")),

  // Accepts a string like "199.99", validates it's a real number, checks min
  price: z.coerce
    .number({ invalid_type_error: "Price must be a valid number" })
    .min(0, "Price cannot be negative"),

  comparePrice: z.coerce
    .number({ invalid_type_error: "Compare price must be a valid number" })
    .min(0, "Compare price cannot be negative")
    .nullable()
    .optional(),

  costPrice: z.coerce
    .number({ invalid_type_error: "Cost price must be a valid number" })
    .min(0, "Cost price cannot be negative")
    .nullable()
    .optional(),

  unitType: z.string().trim().optional().or(z.literal("")),

  // Accepts a string like "10", validates it's an integer, checks min
  stockQuantity: z.coerce
    .number({ invalid_type_error: "Stock quantity must be a valid number" })
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .default(0),

  lowStockThreshold: z.coerce
    .number({ invalid_type_error: "Low stock threshold must be a valid number" })
    .int("Low stock threshold must be an integer")
    .min(0, "Low stock threshold cannot be negative")
    .default(0),
});
export { addProductSchema };