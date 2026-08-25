import mongoose, {Schema} from "mongoose";
import { User } from "./user.model.js";

const customerSchema = new Schema({
  phoneNumber:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  accountStatus:{
    type: String,
    required: true,
    enum: ['active', 'inactive', 'suspended', 'deactivated', 'deleted', 'banned'],
    default: "active"
  },
  emailVerified:{
    type: Boolean,
    required: true,
    default: false 
  },
  phoneVerified:{
    type: Boolean,
    required: true,
    default: false
  },
  user:{
   type: mongoose.Types.ObjectId,
   ref: "User",
   index: true
  }
},
{
  timestamps: true
})

export const Customer = mongoose.model("Customer", customerSchema)